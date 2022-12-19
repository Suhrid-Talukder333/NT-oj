package com.nstu.ntonlinejudge.services;

import com.nstu.ntonlinejudge.models.User;

import java.util.List;

public interface UserService {
  public User saveUser(User user);
  public List<User> getAllUsers();
  public User getUserById(int id);
  public User getUserByEmail(String email);
}