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

import com.example.demo.entities.Breed;
import com.example.demo.repositories.BreedRepository;

@RestController
@RequestMapping("/breeds")
public class BreedController {

    @Autowired
    private BreedRepository breedRepository;

    @GetMapping
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Breed> getBreedById(@PathVariable Integer id) {
        return breedRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Breed createBreed(@RequestBody Breed breed) {
        return breedRepository.save(breed);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Breed> updateBreed(@PathVariable Integer id, @RequestBody Breed breedDetails) {
        return breedRepository.findById(id)
                .map(breed -> {
                    breed.setBreedName(breedDetails.getBreedName());
                    breed.setPetType(breedDetails.getPetType());
                    return ResponseEntity.ok(breedRepository.save(breed));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBreed(@PathVariable Integer id) {
        try {
            return breedRepository.findById(id)
                    .map(breed -> {
                        breedRepository.delete(breed);
                        return ResponseEntity.ok("Breed deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Breed not found."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}

