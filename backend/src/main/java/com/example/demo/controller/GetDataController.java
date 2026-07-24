package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repository.ShopRepository;
import com.example.demo.model.Shop;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class GetDataController {

    @Autowired
    private ShopRepository shopRepo;

    @GetMapping("/shops/{id}")

    public Shop getShop(@PathVariable Long id) {
        return shopRepo.findById(id).orElse(null);
    }
}