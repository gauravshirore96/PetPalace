package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {
    // Additional query methods if needed
}

