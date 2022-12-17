package com.nstu.ntonlinejudge.repositories;

import com.nstu.ntonlinejudge.models.Stat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatRepository extends JpaRepository<Stat,Integer> {
  @Query(value = "SELECT * FROM student WHERE id = ?1", nativeQuery = true)
  Stat getWithId(int id);
}