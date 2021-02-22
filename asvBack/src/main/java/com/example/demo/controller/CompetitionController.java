package com.example.demo.controller;

import com.example.demo.dto.CompetitionDTO;
import com.example.demo.service.CompetitionService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CompetitionController {
	
	private final Logger log = LoggerFactory.getLogger(CompetitionController.class);

	@Autowired
	private CompetitionService competitionService;
	
	
	@GetMapping("/competitions")
	List<CompetitionDTO> getCompetitions(@RequestParam(required = false) String filter) {
		log.debug("REST request to get filtered competitions : {}", filter);
		return competitionService.findBySearhFilter(filter);
	}

	@GetMapping("/competitions/{id}")
	public CompetitionDTO getCompetition(@PathVariable Long id) {
		log.debug("REST request to get Competition : {}", id);
		return competitionService.findById(id);
		
	}

	@PostMapping("/competitions")
	public ResponseEntity<CompetitionDTO> createCompetition(@RequestBody CompetitionDTO competitionDTO) {
		log.debug("REST request to save Competition : {}", competitionDTO);
		if (competitionDTO != null) {
			CompetitionDTO e = competitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(competitionDTO);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/competitions/{id}")
	public ResponseEntity<CompetitionDTO> updateCompetition(@PathVariable Long id, @RequestBody CompetitionDTO competitionDTO) {
		log.debug("REST request to update Competition : {}", competitionDTO);
		if (competitionDTO.getId() != null) {
			CompetitionDTO e = competitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/competitions/{id}")
	public ResponseEntity<String> deleteCompetition(@PathVariable String id) {
		log.debug("REST request to delete Competition : {}", id);
		competitionService.delete(Long.valueOf(id));
		return (ResponseEntity) ResponseEntity.ok("{\"response\":\"ok\"}");
	}



}
