package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.SellerProduct;

public interface SellerProductRepository extends JpaRepository<SellerProduct, Integer> {
    // Additional query methods if needed
}

