package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.OrderItem;
import com.example.demo.repositories.OrderItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Integer id) {
        return orderItemRepository.findById(id);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(Integer id, OrderItem orderItemDetails) {
        return orderItemRepository.findById(id)
                .map(orderItem -> {
                    orderItem.setOrder(orderItemDetails.getOrder());
                    orderItem.setPetSupply(orderItemDetails.getPetSupply());
                    orderItem.setQuantity(orderItemDetails.getQuantity());
                    orderItem.setPrice(orderItemDetails.getPrice());
                    return orderItemRepository.save(orderItem);
                })
                .orElseThrow(() -> new RuntimeException("Order Item not found with id " + id));
    }

    public void deleteOrderItem(Integer id) {
        orderItemRepository.deleteById(id);
    }
}

