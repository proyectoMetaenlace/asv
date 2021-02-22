package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.CompetitionDTO;

public interface CompetitionService {

	CompetitionDTO findById(Long id);

	List<CompetitionDTO> findAll();

	CompetitionDTO create(CompetitionDTO competition);

	void delete(Long id);

	CompetitionDTO update(CompetitionDTO competition);
	
	List<CompetitionDTO> findBySearhFilter(String filter);

}
