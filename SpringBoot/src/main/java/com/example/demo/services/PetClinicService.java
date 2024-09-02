package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.PetClinic;
import com.example.demo.repositories.PetClinicRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PetClinicService {

    @Autowired
    private PetClinicRepository petClinicRepository;

    public List<PetClinic> getAllPetClinics() {
        return petClinicRepository.findAll();
    }

    public Optional<PetClinic> getPetClinicById(Integer id) {
        return petClinicRepository.findById(id);
    }

    public PetClinic createPetClinic(PetClinic petClinic) {
        return petClinicRepository.save(petClinic);
    }

    public PetClinic updatePetClinic(Integer id, PetClinic petClinicDetails) {
        return petClinicRepository.findById(id)
                .map(petClinic -> {
                    petClinic.setName(petClinicDetails.getName());
                    petClinic.setCity(petClinicDetails.getCity());
                    petClinic.setAddress(petClinicDetails.getAddress());
                    petClinic.setContactNumber(petClinicDetails.getContactNumber());
                    petClinic.setDescription(petClinicDetails.getDescription());
                    return petClinicRepository.save(petClinic);
                })
                .orElseThrow(() -> new RuntimeException("Pet Clinic not found with id " + id));
    }

    public void deletePetClinic(Integer id) {
        petClinicRepository.deleteById(id);
    }
}

