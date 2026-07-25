package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class GetAllDataController {
    @Autowired
    ShopRepository repo;

    @GetMapping("/all-data")
    public List<Shop> getAllData() {
        return repo.findAll();
    }
    
}
