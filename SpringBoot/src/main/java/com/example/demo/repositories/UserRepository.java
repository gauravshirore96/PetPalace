package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.Mapping;

import com.example.demo.entities.User;

import jakarta.transaction.Transactional;
@Transactional
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Additional query methods if needed
	//@Mapping
   Optional<User> findByUsername(String userName);
	//@Mapping
    Optional<User> findByEmail(String email);
}
