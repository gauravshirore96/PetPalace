package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.PetType;
import com.example.demo.repositories.PetTypeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PetTypeService {

    @Autowired
    private PetTypeRepository petTypeRepository;

    public List<PetType> getAllPetTypes() {
        return petTypeRepository.findAll();
    }

    public Optional<PetType> getPetTypeById(Integer id) {
        return petTypeRepository.findById(id);
    }

    public PetType createPetType(PetType petType) {
        return petTypeRepository.save(petType);
    }

    public PetType updatePetType(Integer id, PetType petTypeDetails) {
        return petTypeRepository.findById(id)
                .map(petType -> {
                    petType.setPetTypeName(petTypeDetails.getPetTypeName());
                    return petTypeRepository.save(petType);
                })
                .orElseThrow(() -> new RuntimeException("Pet Type not found with id " + id));
    }

    public void deletePetType(Integer id) {
        petTypeRepository.deleteById(id);
    }
}

