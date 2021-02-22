package com.example.demo.service;

import com.example.demo.dto.JwtDto;
import com.example.demo.dto.TeamDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.exception.CustomException;
import com.example.demo.model.entity.Team;
import com.example.demo.model.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.config.security.JwtTokenProvider;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class UserServiceImpl implements UserService {


	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;


	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private AuthenticationManager authenticationManager;

	public JwtDto signin(String username, String password) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			JwtDto jwtDto = new JwtDto();
			jwtDto.setAccessToken(jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles(), false));
			jwtDto.setRefreshToken(jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles(), true));
			return jwtDto;

		} catch (AuthenticationException e) {
			throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
		}
	}

	public JwtDto signup(UserDTO userDto) {
		if (!userRepository.existsByUsername(userDto.getUsername())) {
			userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
			User user = userRepository.save(convertToEntity(userDto));
			JwtDto jwtDto = new JwtDto();
			return jwtDto;
		} else {
			throw new CustomException("Username is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
		}
	}

	public JwtDto refresh(String username) {
		JwtDto jwtDto = new JwtDto();
		jwtDto.setAccessToken(jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles(), false));
		jwtDto.setRefreshToken(jwtTokenProvider.createToken(username, userRepository.findByUsername(username).getRoles(), true));
		return jwtDto;
	}

	@Override
	public UserDTO findById(Long id) {
		return convertToDto(userRepository.findById(id).get());
	}

	@Override
	public List<UserDTO> findAll() {
		List<UserDTO> users = new ArrayList<UserDTO>();
		users = mapListDto(userRepository.findAll());
		//modelMapper.map(userRepository.findAll(), users);
		return users;
	}

	@Override
	public UserDTO create(UserDTO userDTO) {
		return convertToDto(userRepository.save(convertToEntity(userDTO)));
	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public UserDTO update(UserDTO userDTO) {
		return convertToDto(userRepository.save(convertToEntity(userDTO)));
	}

	private UserDTO convertToDto(User user) {
		UserDTO teamDto = modelMapper.map(user, UserDTO.class);

		return teamDto;
	}

	private User convertToEntity(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		return user;
	}

	private List<UserDTO> mapListDto(List<User> source) {
		return source
				.stream()
				.map(element -> convertToDto(element))
				.collect(Collectors.toList());
	}


	private List<User> mapListEntity(List<UserDTO> source) {
		return source
				.stream()
				.map(element -> convertToEntity(element))
				.collect(Collectors.toList());
	}

}
