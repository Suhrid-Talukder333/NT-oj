package com.nstu.ntonlinejudge.repositories;

import com.nstu.ntonlinejudge.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends JpaRepository<Problem,Integer> {
  @Query(value = "SELECT * FROM problems WHERE id = ?1", nativeQuery = true)
  Problem getWithId(int id);
}
