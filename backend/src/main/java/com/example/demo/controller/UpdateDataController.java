package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;

@CrossOrigin(origins = "https://openlyhub.vercel.app/")
@RestController
public class UpdateDataController {

    @Autowired
    ShopRepository repo;

    @PutMapping("/data/update/{id}")
    public Shop updateStatus(@PathVariable Long id,@RequestBody Shop shop){
        Shop existingShop = repo.findById(id).orElseThrow();
        existingShop.setStatus(shop.getStatus());
        repo.save(existingShop);
        return existingShop;
    }
}
