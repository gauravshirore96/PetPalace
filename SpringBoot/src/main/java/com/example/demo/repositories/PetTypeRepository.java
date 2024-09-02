package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.PetType;

public interface PetTypeRepository extends JpaRepository<PetType, Integer> {
    // Additional query methods if needed
}

