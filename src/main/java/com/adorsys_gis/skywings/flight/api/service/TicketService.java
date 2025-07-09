package com.adorsys_gis.skywings.flight.api.service;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import com.adorsys_gis.skywings.flight.api.entity.Passenger;
import com.adorsys_gis.skywings.flight.api.entity.Flight;
import com.adorsys_gis.skywings.flight.api.repository.TicketRepository;
import com.adorsys_gis.skywings.flight.api.repository.PassengerRepository;
import com.adorsys_gis.skywings.flight.api.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Transactional
    public Ticket createTicket(Long passengerId, Long flightId) {
        Passenger passenger = passengerRepository.findById(passengerId)
                .orElseThrow(() -> new IllegalArgumentException("Passenger not found"));
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new IllegalArgumentException("Flight not found"));
        
        Ticket ticket = new Ticket();
        ticket.setPassenger(passenger);
        ticket.setFlight(flight);
        ticket.setBookingDate(LocalDateTime.now());
        ticket.setStatus("CONFIRMED");
        return ticketRepository.save(ticket);
    }

    public Optional<Ticket> getTicket(Long id) {
        return ticketRepository.findById(id);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Transactional
    public Ticket updateTicket(Long id, String status) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
        ticket.setStatus(status);
        return ticketRepository.save(ticket);
    }

    @Transactional
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    public List<Ticket> searchTickets(String departure, String destination, LocalDateTime kickoff) {
        return ticketRepository.searchTickets(departure, destination, kickoff);
    }
}
