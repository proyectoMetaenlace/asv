package com.example.demo.service;

import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.TeamDTO;

public interface TeamService {

	TeamDTO findById(Long id);

	List<TeamDTO> findAll();

	TeamDTO create(TeamDTO team);

	void delete(Long id);

	TeamDTO update(TeamDTO team);

	List<TeamDTO> findBySearhFilter(String filter);

	InputStream getTeamShield(Long id);
	
	void upload(Long id, MultipartFile file);
}
