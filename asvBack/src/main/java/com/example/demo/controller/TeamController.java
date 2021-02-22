package com.example.demo.controller;

import com.example.demo.dto.ResponseMessage;
import com.example.demo.dto.TeamDTO;
import com.example.demo.service.TeamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class TeamController {

	private final Logger log = LoggerFactory.getLogger(TeamController.class);
	
	@Autowired
	private TeamService teamService;

	@GetMapping("/teams")
	List<TeamDTO> getTeams(@RequestParam(required = false) String filter) {
		return teamService.findBySearhFilter(filter);
	}


	@GetMapping("/teams/{id}")
	public TeamDTO getTeam(@PathVariable Long id) {
		log.info("REST request to get Team : {}", id);
		return teamService.findById(id);
	}

	@PostMapping("/teams")
	public ResponseEntity<TeamDTO> createTeam(@RequestBody TeamDTO teamDTO) {
		log.info("REST request to save Team : {}", teamDTO);
		if (teamDTO != null) {
			TeamDTO e = teamService.create(teamDTO);
			if (e != null)
				return ResponseEntity.ok(e);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/teams/{id}")
	public ResponseEntity<TeamDTO> updateTeam(@PathVariable Long id, @RequestBody TeamDTO teamDTO) {
		log.info("REST request to update Team : {}", teamDTO);
		if (teamDTO.getId() != null) {
			TeamDTO e = teamService.create(teamDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/teams/{id}")
	public ResponseEntity<String> deleteTeam(@PathVariable Long id) {
		log.info("REST request to delete Team : {}", id);
		teamService.delete(id);
		return (ResponseEntity) ResponseEntity.ok("{\"response\":\"ok\"}");
	}

	@GetMapping(value = "/shield/{id}/teams", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getShieldTeam(@PathVariable Long id) throws IOException {
		log.info("REST request to get shield Team : {}", id);
		HttpHeaders headers = new HttpHeaders();
		InputStream in = teamService.getTeamShield(id);
		byte[] media = IOUtils.toByteArray(in);
		headers.setCacheControl(CacheControl.noCache().getHeaderValue());
		ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(media, headers, HttpStatus.OK);
		return responseEntity;
	}

	@PostMapping("/upload/{id}")
	public ResponseEntity<ResponseMessage> uploadFile(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
		log.info("REST request to upload file : {}", id);
		String message = "";
		try {
			teamService.upload(id, file);

			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}

}
