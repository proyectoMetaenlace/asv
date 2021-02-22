package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.PlayoffJourneyCompetitionDTO;
import com.example.demo.dto.TeamDTO;
import com.example.demo.model.entity.PlayoffJourneyCompetition;
import com.example.demo.repository.PlayoffJourneyCompetitionRepository;


@Service
@Transactional
public class PlayoffJourneyCompetitionServiceImpl implements PlayoffJourneyCompetitionService {


	@Autowired
	private PlayoffJourneyCompetitionRepository playoffJourneyCompetitionRepository;
	
	@Autowired
	private TeamService teamService;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public PlayoffJourneyCompetitionDTO findById(Long id) {
		return convertToDto(playoffJourneyCompetitionRepository.findById(id).get());
	}

	@Override
	public List<PlayoffJourneyCompetitionDTO> findAll() {
		List<PlayoffJourneyCompetitionDTO> competitions = new ArrayList<PlayoffJourneyCompetitionDTO>();
		modelMapper.map(playoffJourneyCompetitionRepository.findAll(), competitions);
		return competitions;
	}

	@Override
	public PlayoffJourneyCompetitionDTO create(PlayoffJourneyCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(playoffJourneyCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	@Override
	public void delete(Long id) {
		playoffJourneyCompetitionRepository.deleteById(id);
	}

	@Override
	public PlayoffJourneyCompetitionDTO update(PlayoffJourneyCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(playoffJourneyCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	private PlayoffJourneyCompetitionDTO convertToDto(PlayoffJourneyCompetition competition) {
		PlayoffJourneyCompetitionDTO competitionDto = modelMapper.map(competition, PlayoffJourneyCompetitionDTO.class);
		return competitionDto;
	}

	private PlayoffJourneyCompetition convertToEntity(PlayoffJourneyCompetitionDTO competitionDTO) {
		PlayoffJourneyCompetition competition = modelMapper.map(competitionDTO, PlayoffJourneyCompetition.class);
		return competition;
	}

}
