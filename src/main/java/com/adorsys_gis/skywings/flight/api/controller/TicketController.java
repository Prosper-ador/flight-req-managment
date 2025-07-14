package com.adorsys_gis.skywings.flight.api.controller;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import com.adorsys_gis.skywings.flight.api.service.TicketService;
import com.adorsys_gis.skywings.flight.api.dto.TicketRequest;
import com.adorsys_gis.skywings.flight.api.dto.TicketUpdateRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
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
    public ResponseEntity<List<Ticket>> getAllTickets(Authentication authentication) {
        String username = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        List<Ticket> tickets = ticketService.getAllTicketsForUser(username, isAdmin);
        logger.info("Retrieved all tickets for user: {}", username);
        return new ResponseEntity<>(tickets, HttpStatus.OK);
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
            @RequestParam(required = false) Long passengerId,
            @RequestParam(required = false) String departure,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime kickoffFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime kickoffTo
    ) {
        List<Ticket> results = ticketService.searchTickets(passengerId, departure, destination, status, kickoffFrom, kickoffTo);
        return ResponseEntity.ok(results);
    }

    @GetMapping(value = "/export", produces = "text/csv")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public void exportTicketsToCsv(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=tickets.csv");

        List<Ticket> tickets = ticketService.getAllTickets();
        PrintWriter writer = response.getWriter();

        writer.println("Ticket ID,Passenger Name,Flight ID,Departure,Destination,Booking Date,Status");

        for (Ticket t : tickets) {
            writer.printf("%d,%s,%s,%d,%s,%s,%s,%s%n",
                    t.getId(),
                    t.getPassenger().getFirstName(),
                    t.getPassenger().getLastName(),
                    t.getFlight().getId(),
                    t.getFlight().getDepartureAddress(),
                    t.getFlight().getDestinationAddress(),
                    t.getBookingDate(),
                    t.getStatus());
        }
        writer.flush();
        writer.close();
    }
}