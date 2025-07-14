package com.adorsys_gis.skywings.flight.api.repository;

import com.adorsys_gis.skywings.flight.api.entity.Flight;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findByFlightNumber(String flightNumber);
}
