package com.adorsys_gis.skywings.flight.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.adorsys_gis.skywings.flight.api.entity.Flight;
import com.adorsys_gis.skywings.flight.api.repository.FlightRepository;

@Service
public class FlightService {
    private final FlightRepository flightRepository;
    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
}
