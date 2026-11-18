package com.example.demo.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Owner;
import com.example.demo.model.Shop;
import com.example.demo.repository.OwnerRepository;
import com.example.demo.repository.ShopRepository;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://openlyhub.vercel.app"
})
@RestController
public class RegisterShopController {

    @Autowired
    private OwnerRepository ownerRepo;

    @Autowired
    private ShopRepository shopRepo;

    @PostMapping("/shops/register")
    @Transactional
    public ResponseEntity<Map<String, String>> registerShop(
            @RequestBody Map<String, String> request) {

        String name = request.get("name");
        String address = request.get("address");
        String status = request.get("status");
        String password = request.get("password");

        if (name == null || name.isBlank()
                || address == null || address.isBlank()
                || password == null || !password.matches("\\d{5}")
                || status == null
                || (!status.equals("OPEN") && !status.equals("CLOSE"))) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid registration details."));
        }

        // Create owner record
        Owner owner = new Owner();
        owner.setName(name);
        owner.setAddress(address);
        owner.setPassword(password);

        Owner savedOwner = ownerRepo.save(owner);

        // Create public shop record
        Shop shop = new Shop();
        shop.setName(name);
        shop.setAddress(address);
        shop.setStatus(status);
        shop.setLastUpdated(
            LocalDate.now(ZoneId.of("Asia/Kolkata"))
        );

        Shop savedShop = shopRepo.save(shop);

        // IDs must match for the existing owner login system
        if (!savedOwner.getId().equals(savedShop.getId())) {
            throw new IllegalStateException(
                "Owner ID and Shop ID do not match."
            );
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Shop registered successfully."));
    }
}