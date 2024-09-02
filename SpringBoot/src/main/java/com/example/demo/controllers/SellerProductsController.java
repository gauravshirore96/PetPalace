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

import com.example.demo.entities.SellerProduct;
import com.example.demo.repositories.SellerProductRepository;

@RestController
@RequestMapping("/seller-products")
public class SellerProductsController {

    @Autowired
    private SellerProductRepository sellerProductRepository;

    @GetMapping
    public List<SellerProduct> getAllSellerProducts() {
        return sellerProductRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerProduct> getSellerProductById(@PathVariable Integer id) {
        return sellerProductRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SellerProduct createSellerProduct(@RequestBody SellerProduct sellerProduct) {
        return sellerProductRepository.save(sellerProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SellerProduct> updateSellerProduct(@PathVariable Integer id, @RequestBody SellerProduct sellerProductDetails) {
        return sellerProductRepository.findById(id)
                .map(sellerProduct -> {
                    sellerProduct.setSeller(sellerProductDetails.getSeller());
                    sellerProduct.setPetSupply(sellerProductDetails.getPetSupply());
                    sellerProduct.setPrice(sellerProductDetails.getPrice());
                    sellerProduct.setQuantity(sellerProductDetails.getQuantity());
                    return ResponseEntity.ok(sellerProductRepository.save(sellerProduct));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSellerProduct(@PathVariable Integer id) {
        try {
            return sellerProductRepository.findById(id)
                    .map(sellerProduct -> {
                        sellerProductRepository.delete(sellerProduct);
                        return ResponseEntity.ok("SellerProduct deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("SellerProduct not found."));
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting SellerProduct: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}
