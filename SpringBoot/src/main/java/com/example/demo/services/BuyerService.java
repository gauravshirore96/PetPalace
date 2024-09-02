package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Buyer;
import com.example.demo.repositories.BuyerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    public Optional<Buyer> getBuyerById(Integer id) {
        return buyerRepository.findById(id);
    }

    public Buyer createBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    public Buyer updateBuyer(Integer id, Buyer buyerDetails) {
        return buyerRepository.findById(id)
                .map(buyer -> {
                    buyer.setBuyerName(buyerDetails.getBuyerName());
                    buyer.setAddress(buyerDetails.getAddress());
                    buyer.setUser(buyerDetails.getUser());
                    return buyerRepository.save(buyer);
                })
                .orElseThrow(() -> new RuntimeException("Buyer not found with id " + id));
    }

    public void deleteBuyer(Integer id) {
        buyerRepository.deleteById(id);
    }
}

