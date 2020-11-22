package com.mlc.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String firstName,lastName,phoneNumber,experience,balance;





    @DateTimeFormat(style = "dd:mm:yyyy")
    private Date birthDate;

    public Users(String firstName, String lastName, String phoneNumber, String experience, String balance, Date birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.experience = experience;
        this.balance = balance;
        this.birthDate = birthDate;
    }
}







