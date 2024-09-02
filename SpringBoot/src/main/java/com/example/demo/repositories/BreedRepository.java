package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Breed;

public interface BreedRepository extends JpaRepository<Breed, Integer> {
    // Additional query methods if needed
}
