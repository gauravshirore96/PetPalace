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
import com.example.demo.entities.Category;
import com.example.demo.entities.Gender;
import com.example.demo.entities.Pet;
import com.example.demo.entities.PetStatus;
import com.example.demo.entities.PetSupply;
import com.example.demo.entities.PetType;
import com.example.demo.repositories.PetSupplyRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/supplies")
public class PetSuppliesController {

    @Autowired
    private PetSupplyRepository petSupplyRepository;

    @GetMapping
    public List<PetSupply> getAllSupplies() {
        return petSupplyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetSupply> getSupplyById(@PathVariable Integer id) {
        return petSupplyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
   

    @PostMapping
    public PetSupply createSupply( @RequestParam("supplyName") String supplyName,
    @RequestParam("category") String categoryJson,
    @RequestParam("description") String description,
    @RequestParam("price") BigDecimal price ,
    @RequestParam("quantity") Integer quantity,
    @RequestParam(value = "image", required = false) MultipartFile image) {
    	  ObjectMapper objectMapper = new ObjectMapper();
    	 Category category = new Category();
        
		try {
			category = objectMapper.readValue(categoryJson,Category.class);
			
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
          
    	PetSupply petSupply = new PetSupply();
    	petSupply.setSupplyName(supplyName);
    	petSupply.setDescription(description);
    	petSupply.setPrice(price);
    	petSupply.setQuantity(quantity);

    	petSupply.setCategory(category);
        // Handle image if provided
        if (image != null && !image.isEmpty()) {
            try {
            	petSupply.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                // Handle exception appropriately
            }
        }
        return petSupplyRepository.save(petSupply);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetSupply> updateSupply(@PathVariable Integer id, @RequestBody PetSupply supplyDetails) {
        return petSupplyRepository.findById(id)
                .map(supply -> {
                    supply.setSupplyName(supplyDetails.getSupplyName());
                    supply.setCategory(supplyDetails.getCategory());
                    supply.setDescription(supplyDetails.getDescription());
                    supply.setPrice(supplyDetails.getPrice());
                    supply.setQuantity(supplyDetails.getQuantity());
                    supply.setImage(supplyDetails.getImage());
                    return ResponseEntity.ok(petSupplyRepository.save(supply));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupply(@PathVariable Integer id) {
        try {
            return petSupplyRepository.findById(id)
                    .map(supply -> {
                        petSupplyRepository.delete(supply);
                        return ResponseEntity.ok("PetSupply deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("PetSupply not found."));
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting PetSupply: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}
