package com.nstu.ntonlinejudge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NtOnlineJudgeApplication {

	public static void main(String[] args) {
		SpringApplication.run(NtOnlineJudgeApplication.class, args);
	}

}