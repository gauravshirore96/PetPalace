package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.PetClinic;

public interface PetClinicRepository extends JpaRepository<PetClinic, Integer> {
    // Additional query methods if needed
	@Query("SELECT p FROM PetClinic p WHERE LOWER(p.city.cityName) = LOWER(:cityName)")
    List<PetClinic> findByCityName(@Param("cityName") String cityName);
}
