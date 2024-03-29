package com.ntonlinejudge.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter 
@Setter
public class UserSummary {
	
    private String id;
    private String username;
    private String email;
	
}

