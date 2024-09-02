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

import com.example.demo.entities.PetType;
import com.example.demo.repositories.PetTypeRepository;

@RestController
@RequestMapping("/pet-types")
public class PetTypesController {

    @Autowired
    private PetTypeRepository petTypeRepository;

    @GetMapping
    public List<PetType> getAllPetTypes() {
        return petTypeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetType> getPetTypeById(@PathVariable Integer id) {
        return petTypeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PetType createPetType(@RequestBody PetType petType) {
        return petTypeRepository.save(petType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetType> updatePetType(@PathVariable Integer id, @RequestBody PetType petTypeDetails) {
        return petTypeRepository.findById(id)
                .map(petType -> {
                    petType.setPetTypeName(petTypeDetails.getPetTypeName());
                    return ResponseEntity.ok(petTypeRepository.save(petType));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePetType(@PathVariable Integer id) {
        try {
            return petTypeRepository.findById(id)
                    .map(petType -> {
                        petTypeRepository.delete(petType);
                        return ResponseEntity.ok("PetType deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("PetType not found."));
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting PetType: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}

