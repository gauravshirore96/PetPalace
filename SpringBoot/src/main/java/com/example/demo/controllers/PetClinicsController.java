package com.example.demo.controllers;

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

import com.example.demo.entities.PetClinic;
import com.example.demo.repositories.PetClinicRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/clinics")
public class PetClinicsController {

    @Autowired
    private PetClinicRepository petClinicRepository;

    @GetMapping
    public List<PetClinic> getAllClinics() {
        return petClinicRepository.findAll();
    }
    
    
    @GetMapping("/search")
    public ResponseEntity<List<PetClinic>> getClinicsByCityName(@RequestParam String cityName) {
        List<PetClinic> clinics = petClinicRepository.findByCityName(cityName);
        if (clinics.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(clinics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetClinic> getClinicById(@PathVariable Integer id) {
        return petClinicRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    

    @PostMapping
    public PetClinic createClinic(@RequestBody PetClinic petClinic) {
        return petClinicRepository.save(petClinic);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetClinic> updateClinic(@PathVariable Integer id, @RequestBody PetClinic clinicDetails) {
        return petClinicRepository.findById(id)
                .map(clinic -> {
                    clinic.setName(clinicDetails.getName());
                    clinic.setCity(clinicDetails.getCity());
                    clinic.setAddress(clinicDetails.getAddress());
                    clinic.setContactNumber(clinicDetails.getContactNumber());
                    clinic.setDescription(clinicDetails.getDescription());
                    return ResponseEntity.ok(petClinicRepository.save(clinic));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClinic(@PathVariable Integer id) {
        try {
            return petClinicRepository.findById(id)
                    .map(clinic -> {
                        petClinicRepository.delete(clinic);
                        return ResponseEntity.ok("PetClinic deleted successfully.");
                    })
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("PetClinic not found."));
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting PetClinic: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

}

