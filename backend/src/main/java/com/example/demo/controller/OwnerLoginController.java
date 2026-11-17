
package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ShopRepository;
import com.example.demo.model.Shop;

@CrossOrigin(origins = "https://openlyhub.vercel.app")
@RestController
public class OwnerLoginController {

    @Autowired
    private ShopRepository shopRepo;

    @PostMapping("/owner/login")
    public ResponseEntity<Map<String, Boolean>> ownerLogin(
            @RequestBody Map<String, String> request) {

        Long shopId = Long.valueOf(request.get("shopId"));
        String password = request.get("password");

        Shop shop = shopRepo.findById(shopId).orElse(null);

        if (shop == null || !password.equals(shop.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("valid", false));
        }

        return ResponseEntity.ok(Map.of("valid", true));
    }
}
