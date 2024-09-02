package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.SellerProduct;
import com.example.demo.repositories.SellerProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SellerProductService {

    @Autowired
    private SellerProductRepository sellerProductRepository;

    public List<SellerProduct> getAllSellerProducts() {
        return sellerProductRepository.findAll();
    }

    public Optional<SellerProduct> getSellerProductById(Integer id) {
        return sellerProductRepository.findById(id);
    }

    public SellerProduct createSellerProduct(SellerProduct sellerProduct) {
        return sellerProductRepository.save(sellerProduct);
    }

    public SellerProduct updateSellerProduct(Integer id, SellerProduct sellerProductDetails) {
        return sellerProductRepository.findById(id)
                .map(sellerProduct -> {
                    sellerProduct.setSeller(sellerProductDetails.getSeller());
                    sellerProduct.setPetSupply(sellerProductDetails.getPetSupply());
                    sellerProduct.setPrice(sellerProductDetails.getPrice());
                    sellerProduct.setQuantity(sellerProductDetails.getQuantity());
                    return sellerProductRepository.save(sellerProduct);
                })
                .orElseThrow(() -> new RuntimeException("Seller Product not found with id " + id));
    }

    public void deleteSellerProduct(Integer id) {
        sellerProductRepository.deleteById(id);
    }
}

