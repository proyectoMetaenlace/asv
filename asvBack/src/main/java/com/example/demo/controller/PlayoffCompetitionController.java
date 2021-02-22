package com.example.demo.controller;

import com.example.demo.dto.PlayoffCompetitionDTO;
import com.example.demo.service.PlayoffCompetitionService;

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
public class PlayoffCompetitionController {

	@Autowired
	private PlayoffCompetitionService playoffCompetitionService;


	@GetMapping("/playoffCompetitions")
	List<PlayoffCompetitionDTO> getAllPlayoffCompetitions() {
		return playoffCompetitionService.findAll();
	}

	@GetMapping("/playoffCompetitions/{id}")
	public PlayoffCompetitionDTO getPlayoffCompetition(@PathVariable Long id) {
		return playoffCompetitionService.findById(id);
	}

	@PostMapping("/playoffCompetitions")
	public ResponseEntity<PlayoffCompetitionDTO> createPlayoffCompetition(@RequestBody PlayoffCompetitionDTO competitionDTO) {
		if (competitionDTO != null) {
			PlayoffCompetitionDTO e = playoffCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(competitionDTO);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/playoffCompetitions/{id}")
	public ResponseEntity<PlayoffCompetitionDTO> updatePlayoffCompetition(@PathVariable Long id, @RequestBody PlayoffCompetitionDTO competitionDTO) {
		if (competitionDTO.getId() != null) {
			PlayoffCompetitionDTO e = playoffCompetitionService.create(competitionDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/playoffCompetitions/{id}")
	public ResponseEntity<Void> deletePlayoffCompetition(@PathVariable Long id) {
		playoffCompetitionService.delete(id);
		return (ResponseEntity) ResponseEntity.noContent();
	}



}
