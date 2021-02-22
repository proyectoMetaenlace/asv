package com.example.demo.controller;

import com.example.demo.dto.JwtDto;
import com.example.demo.dto.UserDTO;
import com.example.demo.service.UserService;
import com.example.demo.service.UserService;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
public class UserController {

	private final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@GetMapping("/users")
	List<UserDTO> getAllUsers() {
		log.debug("REST request to get all users");
		return userService.findAll();
	}

	@GetMapping("/users/{id}")
	public UserDTO getUser(@PathVariable Long id) {
		log.debug("REST request to get User : {}", id);
		return userService.findById(id);
	}

	@PostMapping("/users")
	public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
		log.debug("REST request to save User : {}", userDTO);
		if (userDTO != null) {
			UserDTO e = userService.create(userDTO);
			if (e != null)
				return ResponseEntity.ok(e);
			return (ResponseEntity) ResponseEntity.notFound();
		}

		return (ResponseEntity) ResponseEntity.notFound();
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
		log.debug("REST request to update User : {}", userDTO);
		if (userDTO.getId() != null) {
			UserDTO e = userService.create(userDTO);
			if (e != null)
				return ResponseEntity.ok(e);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		log.debug("REST request to delete User : {}", id);
		userService.delete(id);
		return (ResponseEntity) ResponseEntity.noContent();
	}


	@PostMapping("/users/signin")
	public ResponseEntity<JwtDto> login(@RequestBody UserDTO userDto) {
		log.debug("REST request to log in : {}", userDto);
		return ResponseEntity.ok(userService.signin(userDto.getUsername(), userDto.getPassword()));
	}

	@PostMapping("/users/signup")
	public ResponseEntity<JwtDto> signup(@RequestBody UserDTO userDto) {
		log.debug("REST request to sign up : {}", userDto);
		return ResponseEntity.ok(userService.signup(userDto));
	}

	@GetMapping("/users/refresh")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
	public ResponseEntity<JwtDto> refresh(HttpServletRequest req) {
		log.debug("REST request to refresh token");
		return ResponseEntity.ok(userService.refresh(req.getRemoteUser()));
	}



}
