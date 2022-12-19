package com.nstu.ntonlinejudge.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nstu.ntonlinejudge.models.User;
import com.nstu.ntonlinejudge.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
  @Autowired
  private UserService userService;

  @PostMapping("/add")
  public User add(@RequestBody User user){
    return userService.saveUser(user);
  }

  @PostMapping("/checkLogin")
  public ResponseEntity checkLogin(@RequestBody User user){
    User foundUser = userService.getUserByEmail(user.getUserEmail());
    if(foundUser != null && foundUser.getPassword().equals(user.getPassword()))
      return new ResponseEntity(HttpStatus.OK);
      return new ResponseEntity(HttpStatus.NOT_FOUND);
  }

  @GetMapping("/getAll")
  public List<User> list(){
    return userService.getAllUsers();
  }

  @GetMapping("/get/{id}")
  public User getById(@PathVariable int id) {
    return userService.getUserById(id);
  }
}