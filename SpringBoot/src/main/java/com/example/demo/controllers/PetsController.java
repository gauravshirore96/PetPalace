package com.example.demo.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Breed;
import com.example.demo.entities.Gender;
import com.example.demo.entities.Pet;
import com.example.demo.entities.PetStatus;
import com.example.demo.entities.PetType;
import com.example.demo.repositories.PetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/pets")
public class PetsController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Integer id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pet createPet( @RequestParam("name") String name,
    	    @RequestParam("petType") String petTypeJson,
    	    @RequestParam("breed") String breedJson,
    	    @RequestParam("age") Integer age,
    	    @RequestParam("gender") Gender gender,
    	    @RequestParam("description") String description,
    	    @RequestParam("price") BigDecimal price,
    	    @RequestParam("status") PetStatus status,
    	    @RequestParam(value = "image", required = false) MultipartFile image) {
    	
    	  ObjectMapper objectMapper = new ObjectMapper();
          PetType petType = new PetType();
          Breed breed= new Breed();
		try {
			petType = objectMapper.readValue(petTypeJson, PetType.class);
			breed = objectMapper.readValue(breedJson, Breed.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
          
    	Pet pet = new Pet();
        pet.setName(name);
        pet.setPetType(petType);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender);
        pet.setDescription(description);
        pet.setPrice(price);
        pet.setStatus(status);
        
        // Handle image if provided
        if (image != null && !image.isEmpty()) {
            try {
                pet.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                // Handle exception appropriately
            }
        }

        return petRepository.save(pet);
    	
    }
    	  

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Integer id, @RequestBody Pet petDetails) {
        return petRepository.findById(id)
                .map(pet -> {
                    pet.setName(petDetails.getName());
                    pet.setPetType(petDetails.getPetType());
                    pet.setBreed(petDetails.getBreed());
                    pet.setAge(petDetails.getAge());
                    pet.setGender(petDetails.getGender());
                    pet.setDescription(petDetails.getDescription());
                    pet.setPrice(petDetails.getPrice());
                    pet.setStatus(petDetails.getStatus());
                    pet.setSeller(petDetails.getSeller());
                    pet.setImage(petDetails.getImage());
                    return ResponseEntity.ok(petRepository.save(pet));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Integer id) {
        try {
            return petRepository.findById(id)
                    .map(pet -> {
                        petRepository.delete(pet);
                        return ResponseEntity.ok("Pet deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found."));
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting Pet: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}

