package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Buyer;
import com.example.demo.repositories.BuyerRepository;

@RestController
@RequestMapping("/buyers")
public class BuyerController {

    @Autowired
    private BuyerRepository buyerRepository;

    @GetMapping
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

   /* @GetMapping("/{id}")
    public ResponseEntity<Buyer> getBuyerById(@PathVariable Integer id) {
        return buyerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Buyer createBuyer(@RequestBody Buyer buyer) {
        return buyerRepository.save(buyer);
    } 

    @PutMapping("/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable Integer id, @RequestBody Buyer buyerDetails) {
        return buyerRepository.findById(id)
                .map(buyer -> {
                    buyer.setBuyerName(buyerDetails.getBuyerName());
                    buyer.setAddress(buyerDetails.getAddress());
                    return ResponseEntity.ok(buyerRepository.save(buyer));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuyer(@PathVariable Integer id) {
        try {
            return buyerRepository.findById(id)
                    .map(buyer -> {
                        buyerRepository.delete(buyer);
                        return ResponseEntity.ok("Buyer deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Buyer not found."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    } */

}

