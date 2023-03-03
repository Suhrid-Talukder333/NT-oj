package com.ntonlinejudge.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntonlinejudge.exception.ResourceNotFoundException;
import com.ntonlinejudge.model.User;
import com.ntonlinejudge.payload.UserIdentityAvailability;
import com.ntonlinejudge.payload.UserProfile;
import com.ntonlinejudge.payload.UserSummary;
import com.ntonlinejudge.repository.UserRepository;
import com.ntonlinejudge.security.CurrentUser;
import com.ntonlinejudge.security.UserPrincipal;

@RestController
@RequestMapping("/api/users")
public class UsersController {

  @Autowired
  private UserRepository userRepository;

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);
  
  @GetMapping("")
  public List<User> getUsers() {
      return userRepository.findAll();
  }
  
}
