package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.repositories.CityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public Optional<City> getCityById(Integer id) {
        return cityRepository.findById(id);
    }

    public City createCity(City city) {
        return cityRepository.save(city);
    }

    public City updateCity(Integer id, City cityDetails) {
        return cityRepository.findById(id)
                .map(city -> {
                    city.setCityName(cityDetails.getCityName());
                    return cityRepository.save(city);
                })
                .orElseThrow(() -> new RuntimeException("City not found with id " + id));
    }

    public void deleteCity(Integer id) {
        cityRepository.deleteById(id);
    }
}

