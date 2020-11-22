package com.mlc.server.repo;


import com.mlc.server.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<Users, Integer> {
    List<Users> findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(String name, String surname, String number);
}
