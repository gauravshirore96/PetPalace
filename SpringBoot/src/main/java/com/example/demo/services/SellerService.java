package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Seller;
import com.example.demo.repositories.SellerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Optional<Seller> getSellerById(Integer id) {
        return sellerRepository.findById(id);
    }

    public Seller createSeller(Seller seller) {
        return sellerRepository.save(seller);
    }

    public Seller updateSeller(Integer id, Seller sellerDetails) {
        return sellerRepository.findById(id)
                .map(seller -> {
                    seller.setSellerName(sellerDetails.getSellerName());
                    seller.setUser(sellerDetails.getUser());
                    return sellerRepository.save(seller);
                })
                .orElseThrow(() -> new RuntimeException("Seller not found with id " + id));
    }

    public void deleteSeller(Integer id) {
        sellerRepository.deleteById(id);
    }
}

