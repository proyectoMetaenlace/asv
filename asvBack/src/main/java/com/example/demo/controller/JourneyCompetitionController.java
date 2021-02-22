package com.example.demo.controller;

import com.example.demo.dto.JourneyCompetitionDTO;
import com.example.demo.service.JourneyCompetitionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JourneyCompetitionController {

	@Autowired
	private JourneyCompetitionService journeyCompetitionService;


	@GetMapping("/journeyCompetitions")
	List<JourneyCompetitionDTO> getAllJourneyCompetitions() {
		return journeyCompetitionService.findAll();
	}

	@GetMapping("/journeyCompetitions/{id}")
	public JourneyCompetitionDTO getJourneyCompetition(@PathVariable Long id) {
		return journeyCompetitionService.findById(id);
	}

	@PostMapping("/journeyCompetitions")
	public ResponseEntity<JourneyCompetitionDTO> createJourneyCompetition(@RequestBody JourneyCompetitionDTO competitionDTO) {
		if (competitionDTO != null) {
			JourneyCompetitionDTO e = journeyCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(competitionDTO);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/journeyCompetitions/{id}")
	public ResponseEntity<JourneyCompetitionDTO> updateJourneyCompetition(@PathVariable Long id, @RequestBody JourneyCompetitionDTO competitionDTO) {
		if (competitionDTO.getId() != null) {
			JourneyCompetitionDTO e = journeyCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/journeyCompetitions/{id}")
	public ResponseEntity<Void> deleteJourneyCompetition(@PathVariable Long id) {
		journeyCompetitionService.delete(id);
		return (ResponseEntity) ResponseEntity.noContent();
	}



}
