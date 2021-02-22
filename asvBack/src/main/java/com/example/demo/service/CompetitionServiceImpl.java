package com.example.demo.service;

import com.example.demo.exception.CustomException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CompetitionDTO;
import com.example.demo.dto.JourneyCompetitionDTO;
import com.example.demo.dto.PlayoffCompetitionDTO;
import com.example.demo.dto.PlayoffJourneyCompetitionDTO;
import com.example.demo.dto.TeamDTO;
import com.example.demo.model.entity.Competition;
import com.example.demo.model.entity.JourneyCompetition;
import com.example.demo.model.entity.PlayoffCompetition;
import com.example.demo.model.entity.PlayoffJourneyCompetition;
import com.example.demo.model.entity.Team;
import com.example.demo.model.filter.CompetitionSearchFilter;
import com.example.demo.model.filter.TeamSearchFilter;
import com.example.demo.model.filter.common.SearchCriteria;
import com.example.demo.model.filter.common.SearchOperation;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.TeamRepository;
import com.example.demo.repository.specification.CompetitionSpecification;
import com.example.demo.repository.specification.TeamSpecification;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class CompetitionServiceImpl implements CompetitionService {

	private final Logger log = LoggerFactory.getLogger(CompetitionServiceImpl.class);

	@Autowired
	private CompetitionRepository competitionRepository;
	
	@Autowired
	private TeamRepository teamRepository;

	@Autowired
	private ModelMapper modelMapper;


	@Override
	public CompetitionDTO findById(Long id) {
		log.debug("Request to find competition by id : {}", id);
		Competition c = competitionRepository.findById(id).get();
		if (c instanceof JourneyCompetition) {
			c.setType("journey");
		} else if (c instanceof PlayoffCompetition){
			c.setType("playoff");
		} else if (c instanceof PlayoffJourneyCompetition) {
			c.setType("journeyPlayoff");
		}
		return convertToDto(c);
	}

	@Override
	public List<CompetitionDTO> findAll() {
		log.debug("Request to find all competitions : {}");
		return mapListDto(competitionRepository.findAll());
	}

	@Override
	public CompetitionDTO create(CompetitionDTO competitionDTO) {
		log.debug("Request to create Competition : {}", competitionDTO);
		return convertToDto(competitionRepository.save(convertToEntity(competitionDTO)));
	}

	@Override
	public void delete(Long id) {
		log.debug("Request to delete Competition : {}", id);
		Competition c = competitionRepository.findById(id).get();
		for (Team t : c.getTeams()) {
			t.getCompetitions().remove(c);
			teamRepository.save(t);
		}
		competitionRepository.deleteById(id);
	}

	@Override
	public CompetitionDTO update(CompetitionDTO competitionDTO) {
		log.debug("Request to update Competition : {}", competitionDTO);
		return convertToDto(competitionRepository.save(convertToEntity(competitionDTO)));
	}

	private List<CompetitionDTO> mapListDto(List<Competition> source) {
		return source
				.stream()
				.map(element -> convertToDto(element))
				.collect(Collectors.toList());
	}

	private List<Competition> mapListEntity(List<CompetitionDTO> source) {
		return source
				.stream()
				.map(element -> convertToEntity(element))
				.collect(Collectors.toList());
	}

	@Override
	public List<CompetitionDTO> findBySearhFilter(String filter) {
		log.debug("Request to find competitions by filter : {}", filter);
		if(Objects.nonNull(filter)) {
			ObjectMapper objectMapper = new ObjectMapper();
			try {
				CompetitionSearchFilter competitionSearchFilter = objectMapper.readValue(filter, CompetitionSearchFilter.class);
				return mapListDto(competitionRepository.findAll(createSpecification(competitionSearchFilter)));

			} catch (JsonProcessingException e) {
        log.error("Search filter is not correct");
        throw new CustomException("Search filter is not correct", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		else{
			return findAll();
		}
	}

	private CompetitionDTO convertToDto(Competition competition) {
		CompetitionDTO competitionDto = modelMapper.map(competition, CompetitionDTO.class);
		competitionDto.setNameWinner(competition.getWinner().getName());

		return competitionDto;
	}

	private Competition convertToEntity(CompetitionDTO competitionDTO) {
		Competition competition = modelMapper.map(competitionDTO, Competition.class);
		return competition;
	}

	private Specification<Competition> createSpecification(CompetitionSearchFilter competitionSearchFilter) {
		CompetitionSpecification ts = new CompetitionSpecification();
		if(Objects.nonNull(competitionSearchFilter.getCompetitionYear())) {
			ts.add(new SearchCriteria("competitionYear", competitionSearchFilter.getCompetitionYear(), SearchOperation.EQUAL));
		}
		if(Objects.nonNull(competitionSearchFilter.getName())){
			ts.add(new SearchCriteria("name", competitionSearchFilter.getName(), SearchOperation.EQUAL));
		}

		
		return ts;
	}

}
