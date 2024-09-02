package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Pet;
import com.example.demo.repositories.PetRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Optional<Pet> getPetById(Integer id) {
        return petRepository.findById(id);
    }

    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet updatePet(Integer id, Pet petDetails) {
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
                    pet.setImage(petDetails.getImage());
                    pet.setSeller(petDetails.getSeller());
                    return petRepository.save(pet);
                })
                .orElseThrow(() -> new RuntimeException("Pet not found with id " + id));
    }

    public void deletePet(Integer id) {
        petRepository.deleteById(id);
    }
}

