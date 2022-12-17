package com.nstu.ntonlinejudge.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nstu.ntonlinejudge.models.TestCase;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase,Integer> {
  @Query(value = "SELECT * FROM testcases WHERE id = ?1", nativeQuery = true)
  TestCase getWithId(int id);
}
