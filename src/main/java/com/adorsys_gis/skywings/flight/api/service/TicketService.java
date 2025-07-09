package com.adorsys_gis.skywings.flight.api.service;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import com.adorsys_gis.skywings.flight.api.entity.Passenger;
import com.adorsys_gis.skywings.flight.api.entity.Flight;
import com.adorsys_gis.skywings.flight.api.repository.TicketRepository;
import com.adorsys_gis.skywings.flight.api.repository.PassengerRepository;
import com.adorsys_gis.skywings.flight.api.repository.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    private static final Logger logger = LoggerFactory.getLogger(TicketService.class);

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Transactional
    public Ticket createTicket(Long passengerId, Long flightId) {
        logger.info("Creating ticket for passengerId: {} and flightId: {}", passengerId, flightId);
        if (passengerId == null || flightId == null) {
            logger.error("Invalid input: passengerId or flightId is null");
            throw new IllegalArgumentException("Passenger ID and Flight ID must not be null");
        }
        Passenger passenger = passengerRepository.findById(passengerId)
                .orElseThrow(() -> {
                    logger.error("Passenger not found with ID: {}", passengerId);
                    return new IllegalArgumentException("Passenger not found");
                });
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> {
                    logger.error("Flight not found with ID: {}", flightId);
                    return new IllegalArgumentException("Flight not found");
                });
        
        Ticket ticket = new Ticket();
        ticket.setPassenger(passenger);
        ticket.setFlight(flight);
        ticket.setBookingDate(LocalDateTime.now());
        ticket.setStatus("CONFIRMED");
        Ticket savedTicket = ticketRepository.save(ticket);
        logger.info("Ticket created successfully with ID: {}", savedTicket.getId());
        return savedTicket;
    }

    public Optional<Ticket> getTicket(Long id) {
        logger.info("Retrieving ticket with ID: {}", id);
        return ticketRepository.findById(id);
    }

    public List<Ticket> getAllTickets() {
        logger.info("Retrieving all tickets");
        return ticketRepository.findAll();
    }

    @Transactional
    public Ticket updateTicket(Long id, String status) {
        logger.info("Updating ticket with ID: {} to status: {}", id, status);
        if (status == null || status.isBlank()) {
            logger.error("Invalid status provided for ticket ID: {}", id);
            throw new IllegalArgumentException("Status must not be empty");
        }
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Ticket not found with ID: {}", id);
                    return new IllegalArgumentException("Ticket not found");
                });
        ticket.setStatus(status);
        Ticket updatedTicket = ticketRepository.save(ticket);
        logger.info("Ticket updated successfully with ID: {}", updatedTicket.getId());
        return updatedTicket;
    }

    @Transactional
    public void deleteTicket(Long id) {
        logger.info("Deleting ticket with ID: {}", id);
        if (!ticketRepository.existsById(id)) {
            logger.error("Ticket not found with ID: {}", id);
            throw new IllegalArgumentException("Ticket not found");
        }
        ticketRepository.deleteById(id);
        logger.info("Ticket deleted successfully with ID: {}", id);
    }

    public List<Ticket> searchTickets(String departure, String destination, LocalDateTime kickoff) {
        logger.info("Searching tickets with departure: {}, destination: {}, kickoff: {}", departure, destination, kickoff);
        if (departure == null || destination == null || kickoff == null) {
            logger.error("Invalid search parameters: departure, destination, or kickoff is null");
            throw new IllegalArgumentException("Search parameters must not be null");
        }
        return ticketRepository.searchTickets(departure, destination, kickoff);
    }
}