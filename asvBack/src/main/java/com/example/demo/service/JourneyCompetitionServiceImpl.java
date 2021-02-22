package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.JourneyCompetitionDTO;
import com.example.demo.dto.TeamDTO;
import com.example.demo.model.entity.JourneyCompetition;
import com.example.demo.repository.JourneyCompetitionRepository;


@Service
@Transactional
public class JourneyCompetitionServiceImpl implements JourneyCompetitionService {


	@Autowired
	private JourneyCompetitionRepository journeyCompetitionRepository;
	
	@Autowired
	private TeamService teamService;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public JourneyCompetitionDTO findById(Long id) {
		return convertToDto(journeyCompetitionRepository.findById(id).get());
	}

	@Override
	public List<JourneyCompetitionDTO> findAll() {
		List<JourneyCompetitionDTO> competitions = new ArrayList<JourneyCompetitionDTO>();
		modelMapper.map(journeyCompetitionRepository.findAll(), competitions);
		return competitions;
	}

	@Override
	public JourneyCompetitionDTO create(JourneyCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(journeyCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	@Override
	public void delete(Long id) {
		journeyCompetitionRepository.deleteById(id);
	}

	@Override
	public JourneyCompetitionDTO update(JourneyCompetitionDTO competitionDTO) {
		TeamDTO t = teamService.findById(1L);
		competitionDTO.setWinner(t);
		return convertToDto(journeyCompetitionRepository.save(convertToEntity(competitionDTO)));
	}

	private JourneyCompetitionDTO convertToDto(JourneyCompetition competition) {
		JourneyCompetitionDTO competitionDto = modelMapper.map(competition, JourneyCompetitionDTO.class);
		return competitionDto;
	}

	private JourneyCompetition convertToEntity(JourneyCompetitionDTO competitionDTO) {
		JourneyCompetition competition = modelMapper.map(competitionDTO, JourneyCompetition.class);
		return competition;
	}

}
