package com.nstu.ntonlinejudge.services;

import com.nstu.ntonlinejudge.models.User;
import com.nstu.ntonlinejudge.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImplement implements UserService {

  @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.getWithId(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getWithEmail(email);
    }

}