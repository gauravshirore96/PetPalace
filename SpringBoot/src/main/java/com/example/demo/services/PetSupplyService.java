package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.PetSupply;
import com.example.demo.repositories.PetSupplyRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PetSupplyService {

    @Autowired
    private PetSupplyRepository petSupplyRepository;

    public List<PetSupply> getAllPetSupplies() {
        return petSupplyRepository.findAll();
    }

    public Optional<PetSupply> getPetSupplyById(Integer id) {
        return petSupplyRepository.findById(id);
    }

    public PetSupply createPetSupply(PetSupply petSupply) {
        return petSupplyRepository.save(petSupply);
    }

    public PetSupply updatePetSupply(Integer id, PetSupply petSupplyDetails) {
        return petSupplyRepository.findById(id)
                .map(petSupply -> {
                    petSupply.setSupplyName(petSupplyDetails.getSupplyName());
                    petSupply.setCategory(petSupplyDetails.getCategory());
                    petSupply.setDescription(petSupplyDetails.getDescription());
                    petSupply.setPrice(petSupplyDetails.getPrice());
                    petSupply.setQuantity(petSupplyDetails.getQuantity());
                    petSupply.setImage(petSupplyDetails.getImage());
                    return petSupplyRepository.save(petSupply);
                })
                .orElseThrow(() -> new RuntimeException("Pet Supply not found with id " + id));
    }

    public void deletePetSupply(Integer id) {
        petSupplyRepository.deleteById(id);
    }
}

