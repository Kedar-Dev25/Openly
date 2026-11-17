
package com.example.demo.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://openlyhub.vercel.app"
})
@RestController
public class GetAllDataController {

    @Autowired
    ShopRepository repo;

    @GetMapping("/all-data")
    public List<Shop> getAllData() {

        // Get today's date according to Indian time
        LocalDate today = LocalDate.now(
            ZoneId.of("Asia/Kolkata")
        );

        // Get all shops from database
        List<Shop> shops = repo.findAll();

        // Check each shop's last updated date
        for (Shop shop : shops) {

            if (shop.getLastUpdated() == null ||
                !shop.getLastUpdated().equals(today)) {

                shop.setStatus("NOT_UPDATED");
            }
        }

        // Send modified list to frontend
        return shops;
    }
}
