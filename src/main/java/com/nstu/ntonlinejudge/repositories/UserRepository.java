package com.nstu.ntonlinejudge.repositories;

import com.nstu.ntonlinejudge.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
  @Query(value = "SELECT * FROM user WHERE user_id = ?1", nativeQuery = true)
  User getWithId(int id);

  @Query(value = "SELECT * FROM user WHERE user_email = ?1", nativeQuery = true)
  User getWithEmail(String email);
}
