package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.PlayoffCompetitionDTO;

public interface PlayoffCompetitionService {

	PlayoffCompetitionDTO findById(Long id);

	List<PlayoffCompetitionDTO> findAll();

	PlayoffCompetitionDTO create(PlayoffCompetitionDTO competition);

	void delete(Long id);

	PlayoffCompetitionDTO update(PlayoffCompetitionDTO competition);

}
