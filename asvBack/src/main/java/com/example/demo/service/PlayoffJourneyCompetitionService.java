package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.PlayoffJourneyCompetitionDTO;

public interface PlayoffJourneyCompetitionService {
	
	PlayoffJourneyCompetitionDTO findById(Long id);
	
	List<PlayoffJourneyCompetitionDTO> findAll();

	PlayoffJourneyCompetitionDTO create(PlayoffJourneyCompetitionDTO competicion);
	
	void delete(Long id);
	
	PlayoffJourneyCompetitionDTO update(PlayoffJourneyCompetitionDTO competicion);

}
