package com.adorsys_gis.skywings.flight.api.controller;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import com.adorsys_gis.skywings.flight.api.service.TicketService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private static final Logger logger = LoggerFactory.getLogger(TicketController.class);

    @Autowired
    private TicketService ticketService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Ticket> createTicket(@Valid @RequestBody TicketRequest ticketRequest) {
        logger.info("Received request to create ticket for passengerId: {}", ticketRequest.getPassengerId());
        Ticket ticket = ticketService.createTicket(ticketRequest.getPassengerId(), ticketRequest.getFlightId());
        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Ticket> getTicket(@PathVariable Long id) {
        logger.info("Received request to retrieve ticket with ID: {}", id);
        return ticketService.getTicket(id)
                .map(ticket -> new ResponseEntity<>(ticket, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        logger.info("Received request to retrieve all tickets");
        return new ResponseEntity<>(ticketService.getAllTickets(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @Valid @RequestBody TicketUpdateRequest updateRequest) {
        logger.info("Received request to update ticket with ID: {}", id);
        Ticket ticket = ticketService.updateTicket(id, updateRequest.getStatus());
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        logger.info("Received request to delete ticket with ID: {}", id);
        ticketService.deleteTicket(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Ticket>> searchTickets(
            @RequestParam @NotBlank(message = "Departure is mandatory") String departure,
            @RequestParam @NotBlank(message = "Destination is mandatory") String destination,
            @RequestParam @NotNull(message = "Kickoff datetime is mandatory") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime kickoff) {
        logger.info("Received search request for tickets with departure: {}, destination: {}, kickoff: {}", departure, destination, kickoff);
        List<Ticket> tickets = ticketService.searchTickets(departure, destination, kickoff);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }
}

@Setter
@Getter
class TicketRequest {
    @NotNull(message = "Passenger ID is mandatory")
    private Long passengerId;
    @NotNull(message = "Flight ID is mandatory")
    private Long flightId;

}

@Setter
@Getter
class TicketUpdateRequest {
    @NotBlank(message = "Status is mandatory")
    private String status;

}