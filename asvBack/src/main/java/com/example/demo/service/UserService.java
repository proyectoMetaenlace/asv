package com.example.demo.service;

import com.example.demo.dto.JwtDto;
import java.util.List;

import com.example.demo.dto.UserDTO;

public interface UserService {

  UserDTO findById(Long id);

  List<UserDTO> findAll();

  UserDTO create(UserDTO user);

  void delete(Long id);

  UserDTO update(UserDTO user);

  JwtDto signin(String username, String password);

  JwtDto signup(UserDTO user);

  JwtDto refresh(String username);
}
