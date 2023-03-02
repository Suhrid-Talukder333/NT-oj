package com.ntonlinejudge.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ntonlinejudge.model.Problem;

import java.util.Optional;

@Repository
public interface ProblemRepository extends MongoRepository<Problem, String> {

    Optional<Problem> findByName(String problemName);
}
