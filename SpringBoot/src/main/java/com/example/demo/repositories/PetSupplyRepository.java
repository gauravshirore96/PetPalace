package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.PetSupply;

public interface PetSupplyRepository extends JpaRepository<PetSupply, Integer> {
    // Additional query methods if needed
}

