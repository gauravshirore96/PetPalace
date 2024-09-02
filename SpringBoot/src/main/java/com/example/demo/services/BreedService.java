package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Breed;
import com.example.demo.repositories.BreedRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BreedService {

    @Autowired
    private BreedRepository breedRepository;

    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    public Optional<Breed> getBreedById(Integer id) {
        return breedRepository.findById(id);
    }

    public Breed createBreed(Breed breed) {
        return breedRepository.save(breed);
    }

    public Breed updateBreed(Integer id, Breed breedDetails) {
        return breedRepository.findById(id)
                .map(breed -> {
                    breed.setBreedName(breedDetails.getBreedName());
                    breed.setPetType(breedDetails.getPetType());
                    return breedRepository.save(breed);
                })
                .orElseThrow(() -> new RuntimeException("Breed not found with id " + id));
    }

    public void deleteBreed(Integer id) {
        breedRepository.deleteById(id);
    }
}

