package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "breeds")
public class Breed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "breed_id")
    private int breedId;

    @Column(name = "breed_name", nullable = false, unique = true)
    private String breedName;

    @ManyToOne
    @JoinColumn(name = "pettype_id")
    private PetType petType;

    // Getters and Setters

    public int getBreedId() {
        return breedId;
    }

    public void setBreedId(int breedId) {
        this.breedId = breedId;
    }

    public String getBreedName() {
        return breedName;
    }

    public void setBreedName(String breedName) {
        this.breedName = breedName;
    }

    public PetType getPetType() {
        return petType;
    }

    public void setPetType(PetType petType) {
        this.petType = petType;
    }
}
