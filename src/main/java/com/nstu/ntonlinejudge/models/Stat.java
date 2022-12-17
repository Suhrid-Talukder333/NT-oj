package com.nstu.ntonlinejudge.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import javax.persistence.Id;
import javax.persistence.ElementCollection;
import lombok.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statId;
    private int userId;
    private int problemSolvedCount;
    private int problemAttemptedCount;
    private int problemWrongCount;
    private int problemErrorCount;
}