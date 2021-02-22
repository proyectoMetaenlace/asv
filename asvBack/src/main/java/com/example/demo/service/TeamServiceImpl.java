package com.example.demo.service;

import com.example.demo.dto.CompetitionDTO;
import com.example.demo.dto.TeamDTO;
import com.example.demo.exception.CustomException;
import com.example.demo.model.entity.Competition;
import com.example.demo.model.entity.Team;
import com.example.demo.model.filter.TeamSearchFilter;
import com.example.demo.model.filter.common.SearchCriteria;
import com.example.demo.model.filter.common.SearchOperation;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.repository.specification.TeamSpecification;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private CompetitionRepository competitionRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${demo.app.path.shield}")
	private String shieldPath;

	private final Logger log = LoggerFactory.getLogger(TeamServiceImpl.class);

	@Override
	public TeamDTO findById(Long id) {
		log.info("Request to find team by id : {}", id);
		return convertToDto(teamRepository.findById(id).get());
	}

	@Override
	public List<TeamDTO> findAll() {
		log.debug("Request to find all teams : {}");
		return mapListDto(teamRepository.findAll());
	}

	@Override
	public TeamDTO create(TeamDTO teamDTO) {
		log.info("Request to create team : {}", teamDTO);
		return convertToDto(teamRepository.save(convertToEntity(teamDTO)));
	}

	@Override
	public TeamDTO update(TeamDTO teamDTO) {
		log.info("Request to update competition : {}", teamDTO);
		return convertToDto(teamRepository.save(convertToEntity(teamDTO)));
	}

	@Override
	public List<TeamDTO> findBySearhFilter(String filter) {
		log.info("Request to find filtered competitions : {}", filter);
		if (Objects.nonNull(filter)) {
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				byte[] decodedBytes = Base64.getUrlDecoder().decode(filter);
				String decodedfilter = new String(decodedBytes);
				TeamSearchFilter teamSearchFilter = objectMapper.readValue(decodedfilter, TeamSearchFilter.class);
				return mapListDto(teamRepository.findAll(createSpecification(teamSearchFilter)));

			} catch (JsonProcessingException e) {
				throw new CustomException("Search filter is not correct", HttpStatus.INTERNAL_SERVER_ERROR);

			}
		} else {
			return findAll();
		}
	}

	@Override
	public void delete(Long id) {
		log.info("Request to delete competition : {}", id);
		Team t = teamRepository.findById(id).get();
		for (Competition c : t.getCompetitions()) {
			c.getTeams().remove(t);
			competitionRepository.save(c);
		}
		teamRepository.deleteById(id);
	}

	private TeamDTO convertToDto(Team team) {
		TeamDTO teamDto = modelMapper.map(team, TeamDTO.class);
		teamDto.setNameHistRivalTeam(Objects.nonNull(team.getHistoricalRivalTeam()) ? team.getHistoricalRivalTeam().getName() : null);
		teamDto.setNumChampionsLeague(Objects.nonNull(team.getCompetitions()) ? team.getCountChampionsLeague() : null);
		teamDto.setCompetitionsDTO(Objects.nonNull(team.getCompetitions()) ? mapListCompetitionDto(team.getCompetitions()) : null);
		return teamDto;
	}

	private Team convertToEntity(TeamDTO teamDTO) {
		Team team = modelMapper.map(teamDTO, Team.class);
		return team;
	}

	private CompetitionDTO convertToCompetitionDto(Competition competition) {
		CompetitionDTO competitionDTO = modelMapper.map(competition, CompetitionDTO.class);
		return competitionDTO;
	}

	private Set<CompetitionDTO> mapListCompetitionDto(Set<Competition> source) {
		return source
				.stream()
				.map(element -> convertToCompetitionDto(element))
				.collect(Collectors.toSet());
	}

	private List<TeamDTO> mapListDto(List<Team> source) {
		return source
				.stream()
				.map(element -> convertToDto(element))
				.collect(Collectors.toList());
	}


	private List<Team> mapListEntity(List<TeamDTO> source) {
		return source
				.stream()
				.map(element -> convertToEntity(element))
				.collect(Collectors.toList());
	}

	private Specification<Team> createSpecification(TeamSearchFilter teamSearchFilter) {
		TeamSpecification ts = new TeamSpecification();
		if (Objects.nonNull(teamSearchFilter.getCountry())) {
			ts.add(new SearchCriteria("country", teamSearchFilter.getCountry(), SearchOperation.MATCH));
		}
		if (Objects.nonNull(teamSearchFilter.getName())) {
			ts.add(new SearchCriteria("name", teamSearchFilter.getName(), SearchOperation.MATCH));
		}

		/*Pageable pageable = PageRequest.of(0, 2, Sort.by("name").descending());
    Page<Team> ms = teamRepository.findAll(ts, pageable);*/

		return ts;
	}


	@Override
	public InputStream getTeamShield(Long id) {
		log.info("Request to get teamshield : {}", id);
		Team team = teamRepository.getOne(id);
		InputStream in = null;
		try {
			in = new FileInputStream(shieldPath + team.getShieldPhoto());
		} catch (FileNotFoundException e) {
			log.error("File Not Found");
			throw new CustomException("File Not Found", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return in;
	}

	@Override
	public void upload(Long id, MultipartFile file) {
		log.info("Request to upload file : {}", id);
		try {
			String p = shieldPath + file.getOriginalFilename();
			Path path = Paths.get(p);
			Files.copy(file.getInputStream(), path);
			Team t = teamRepository.getOne(id);
			t.setShieldPhoto(file.getOriginalFilename());
			teamRepository.save(t);
		} catch (Exception e) {
			throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
		}

	}

}
