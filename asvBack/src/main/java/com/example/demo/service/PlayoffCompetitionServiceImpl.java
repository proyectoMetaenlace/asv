package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.PlayoffCompetitionDTO;
import com.example.demo.dto.TeamDTO;
import com.example.demo.model.entity.PlayoffCompetition;
import com.example.demo.repository.PlayoffCompetitionRepository;


@Service
@Transactional
public class PlayoffCompetitionServiceImpl implements PlayoffCompetitionService {


	@Autowired
	private PlayoffCompetitionRepository playoffCompetitionRepository;
	
	@Autowired
	private TeamService teamService;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public PlayoffCompetitionDTO findById(Long id) {
		return convertToDto(playoffCompetitionRepository.findById(id).get());
	}

	@Override
	public List<PlayoffCompetitionDTO> findAll() {
		List<PlayoffCompetitionDTO> competitions = new ArrayList<PlayoffCompetitionDTO>();
		modelMapper.map(playoffCompetitionRepository.findAll(), competitions);
		return competitions;
	}

	@Override
	public PlayoffCompetitionDTO create(PlayoffCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(playoffCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	@Override
	public void delete(Long id) {
		playoffCompetitionRepository.deleteById(id);
	}

	@Override
	public PlayoffCompetitionDTO update(PlayoffCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(playoffCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	private PlayoffCompetitionDTO convertToDto(PlayoffCompetition competition) {
		PlayoffCompetitionDTO competitionDto = modelMapper.map(competition, PlayoffCompetitionDTO.class);
		return competitionDto;
	}

	private PlayoffCompetition convertToEntity(PlayoffCompetitionDTO competitionDTO) {
		PlayoffCompetition competition = modelMapper.map(competitionDTO, PlayoffCompetition.class);
		return competition;
	}

}
