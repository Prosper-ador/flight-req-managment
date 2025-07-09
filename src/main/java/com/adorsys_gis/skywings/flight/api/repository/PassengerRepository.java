package com.adorsys_gis.skywings.flight.api.repository;

import com.adorsys_gis.skywings.flight.api.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
}