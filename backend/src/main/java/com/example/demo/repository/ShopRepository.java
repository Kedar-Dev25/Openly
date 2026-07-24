package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Shop;


public interface ShopRepository extends JpaRepository<Shop, Long> {

}