package com.mlc.server.controller;

import com.mlc.server.entity.Users;
import com.mlc.server.repo.UserRepo;
import com.mlc.server.req.ReqUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    UserRepo userRepo;

    @GetMapping
    public HttpEntity<?> getAll(){
        return ResponseEntity.ok(userRepo.findAll());
    }

    @GetMapping("/search")
    public HttpEntity<?> search(@RequestParam String name, @RequestParam String surname, @RequestParam String number){
        return ResponseEntity.ok(
                userRepo.findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(name,surname,number));
    }
    @PostMapping
    public HttpEntity<?>save(@RequestBody ReqUser reqUser){
        userRepo.save(new Users(reqUser.getFirstName(),reqUser.getLastName(),reqUser.getPhoneNumber(),
                reqUser.getExperience(),reqUser.getBalance(),reqUser.getBirthDate()));
    return null;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id){
    userRepo.deleteById(id);
    }

    @PutMapping("{id}")
    public void edit (@PathVariable Integer id,@RequestBody ReqUser reqUser){
        Users users = userRepo.findById(id).get();
        users.setFirstName(reqUser.getFirstName());
        users.setLastName(reqUser.getLastName());
        users.setPhoneNumber(reqUser.getPhoneNumber());
        users.setExperience(reqUser.getExperience());
        users.setBalance(reqUser.getBalance());
        users.setBirthDate(reqUser.getBirthDate());
        userRepo.save(users);
    }
}









