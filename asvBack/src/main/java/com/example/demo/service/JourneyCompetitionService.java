package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.JourneyCompetitionDTO;

public interface JourneyCompetitionService {

	JourneyCompetitionDTO findById(Long id);

	List<JourneyCompetitionDTO> findAll();

	JourneyCompetitionDTO create(JourneyCompetitionDTO competition);

	void delete(Long id);

	JourneyCompetitionDTO update(JourneyCompetitionDTO competition);

}
