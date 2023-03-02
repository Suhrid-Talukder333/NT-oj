package com.ntonlinejudge.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ntonlinejudge.exception.ResourceNotFoundException;
import com.ntonlinejudge.model.Problem;
import com.ntonlinejudge.model.Submission;
import com.ntonlinejudge.model.User;
import com.ntonlinejudge.repository.ProblemRepository;
import com.ntonlinejudge.repository.SubmissionRepository;
import com.ntonlinejudge.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/submission")
@RequiredArgsConstructor
public class SubmissionController {
	
	@Autowired
	private SubmissionRepository submissionRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProblemRepository problemRepository;
	
	@GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Submission> findAll() {
        return submissionRepository.findAll();
    }
	
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createSubmission(@RequestBody Submission submission) {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			submission.setDate(formatter.format(date));
			submissionRepository.save(submission);
			Optional<User> user = userRepository.findById(submission.getUserId());
			if (user.isPresent()) {
				User u = user.get();
				Map<String, Object> stats = (Map<String, Object>) u.getStats();
				stats.put("totalCount", (int)stats.get("totalCount") + 1);
				Object verdicts = stats.get("verdicts");
				Map<String, Object> verdictsMap = (Map<String, Object>)verdicts;
				if (submission.getVerdict().equals("AC")) {
					verdictsMap.put("ACCount", (int)verdictsMap.get("ACCount") + 1);
				} else if (submission.getVerdict().equals("WA")) {
					verdictsMap.put("WACount", (int)verdictsMap.get("WACount") + 1);
				} else if (submission.getVerdict().equals("TLE")) {
					verdictsMap.put("TLECount", (int)verdictsMap.get("TLECount") + 1);
				} else if (submission.getVerdict().equals("MLE")) {
					verdictsMap.put("MLECount", (int)verdictsMap.get("MLECount") + 1);
				} else if (submission.getVerdict().equals("CE")) {
					verdictsMap.put("CECount", (int)verdictsMap.get("CECount") + 1);
				} else if (submission.getVerdict().equals("RTE")) {
					verdictsMap.put("RTECount", (int)verdictsMap.get("RTECount") + 1);
				}
				stats.put("verdicts", verdictsMap);
				Optional<Problem> problem = problemRepository.findByName(submission.getProblemName());
				if (problem.isPresent()) {
					Problem p = problem.get();
					ArrayList<String> tags = p.getTags();
					for (String tag : tags) {
						if (((Map<String, Object>) stats.get("tags")).containsKey(tag)) {
							Map<String, Object> tagsMap = (Map<String, Object>) stats.get("tags");
							int count = (int)tagsMap.get(tag) + 1;
							((Map<String, Object>) stats.get("tags")).put(tag, count);
						} else {
							((Map<String, Object>) stats.get("tags")).put(tag, 1);
						}
					}
				}
				u.setStats(stats);
				userRepository.save(u);
			}
    }
    
    @GetMapping("/{id}")
	public Submission getSubmissionById(@PathVariable(value = "id") String submissionId) {
	    return submissionRepository.findById(submissionId)
	            .orElseThrow(() -> new ResourceNotFoundException("Submission", "id", submissionId));
	}
	
    @GetMapping("/user/{id}")
	public List<Submission> getSubmissionByUserId(@PathVariable(value = "id") String userId) {
	    return submissionRepository.findByUserId(userId);
	}
    
    @GetMapping("/user/{id}/{verdict}")
	public List<Submission> getSubmissionByUserIdAndVerdict(@PathVariable(value = "id") String userId, @PathVariable(value = "verdict") String verdict) {
	    return submissionRepository.findByUserIdAndVerdict(userId, verdict);
	}
}
