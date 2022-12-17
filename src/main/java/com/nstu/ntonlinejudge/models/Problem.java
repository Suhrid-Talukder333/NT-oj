package com.nstu.ntonlinejudge.models;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import javax.persistence.Id;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import lombok.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String year;
    private String term;
    private String teacher;
    private String code;
    private String credit;
    private String time;
    private String status;
    private String description;
}