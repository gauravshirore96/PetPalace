package com.example.demo.entities;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "PetSupplies")
public class PetSupply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer supplyId;

    @Column(nullable = false)
    private String supplyName;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer quantity;

    @Lob
    private byte[] image;

    // Getters and setters
    public Integer getSupplyId() {
        return supplyId;
    }

    public void setSupplyId(Integer supplyId) {
        this.supplyId = supplyId;
    }

    public String getSupplyName() {
        return supplyName;
    }

    public void setSupplyName(String supplyName) {
        this.supplyName = supplyName;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
