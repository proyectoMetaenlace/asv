package com.example.demo.controller;

import com.example.demo.dto.PlayoffJourneyCompetitionDTO;
import com.example.demo.service.PlayoffJourneyCompetitionService;

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
public class PlayoffJourneyCompetitionController {

	@Autowired
	private PlayoffJourneyCompetitionService playoffJourneyCompetitionService;


	@GetMapping("/playoffJourneyCompetitions")
	List<PlayoffJourneyCompetitionDTO> getAllPlayoffJourneyCompetitions() {
		return playoffJourneyCompetitionService.findAll();
	}

	@GetMapping("/playoffJourneyCompetitions/{id}")
	public PlayoffJourneyCompetitionDTO getPlayoffJourneyCompetition(@PathVariable Long id) {
		return playoffJourneyCompetitionService.findById(id);
	}

	@PostMapping("/playoffJourneyCompetitions")
	public ResponseEntity<PlayoffJourneyCompetitionDTO> createPlayoffJourneyCompetition(@RequestBody PlayoffJourneyCompetitionDTO competitionDTO) {
		if (competitionDTO != null) {
			PlayoffJourneyCompetitionDTO e = playoffJourneyCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(competitionDTO);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/playoffJourneyCompetitions/{id}")
	public ResponseEntity<PlayoffJourneyCompetitionDTO> updatePlayoffJourneyCompetition(@PathVariable Long id, @RequestBody PlayoffJourneyCompetitionDTO competitionDTO) {
		if (competitionDTO.getId() != null) {
			PlayoffJourneyCompetitionDTO e = playoffJourneyCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/playoffJourneyCompetitions/{id}")
	public ResponseEntity<Void> deletePlayoffJourneyCompetition(@PathVariable Long id) {
		playoffJourneyCompetitionService.delete(id);
		return (ResponseEntity) ResponseEntity.noContent();
	}



}
