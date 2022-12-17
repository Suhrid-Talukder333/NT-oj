package com.nstu.ntonlinejudge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nstu.ntonlinejudge.models.Submission;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission,Integer> {
  @Query(value = "SELECT * FROM submissions WHERE id = ?1", nativeQuery = true)
  Submission getWithId(int id);
}