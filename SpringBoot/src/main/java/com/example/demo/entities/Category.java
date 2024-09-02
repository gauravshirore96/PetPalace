package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    @Column(nullable = false)
    private String categoryName;

    // Getters and setters
    
    public Integer getcategoryId() {
    	return categoryId;
    }
    
    public void setcategoryId(Integer categoryId) {
    	this.categoryId = categoryId;
    }
    
    public String getCategoryName() {
    	return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
    	this.categoryName = categoryName;
    }
}

