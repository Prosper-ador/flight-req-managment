package com.adorsys_gis.demo;

import com.adorsys_gis.skywings.flight.api.entity.Flight;
import com.adorsys_gis.skywings.flight.api.entity.Passenger;
import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import com.adorsys_gis.skywings.flight.api.repository.FlightRepository;
import com.adorsys_gis.skywings.flight.api.repository.PassengerRepository;
import com.adorsys_gis.skywings.flight.api.repository.TicketRepository;
import com.adorsys_gis.skywings.flight.api.service.TicketService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Mock
    private PassengerRepository passengerRepository;

    @Mock
    private FlightRepository flightRepository;

    @InjectMocks
    private TicketService ticketService;

    private Passenger passenger;
    private Flight flight;

    @BeforeEach
    void setUp() {
        passenger = new Passenger();
        passenger.setId(1L);
        passenger.setFirstName("John");
        passenger.setLastName("Doe");
        passenger.setEmail("john.doe@example.com");

        flight = new Flight();
        flight.setId(1L);
        flight.setFlightNumber("SW123");
        flight.setDepartureAddress("New York, NY");
        flight.setDestinationAddress("Los Angeles, CA");
        flight.setKickoffDateTime(LocalDateTime.now().plusDays(1));
        flight.setDuration(360);
        flight.setPrice(new BigDecimal("299.99"));
    }

    @Test
    void testCreateTicketSuccess() {
        when(passengerRepository.findById(1L)).thenReturn(Optional.of(passenger));
        when(flightRepository.findById(1L)).thenReturn(Optional.of(flight));
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(invocation -> {
            Ticket ticket = invocation.getArgument(0);
            ticket.setId(1L);
            return ticket;
        });

        Ticket ticket = ticketService.createTicket(1L, 1L);

        assertNotNull(ticket);
        assertEquals(1L, ticket.getId());
        assertEquals("CONFIRMED", ticket.getStatus());
        verify(ticketRepository).save(any(Ticket.class));
    }

    @Test
    void testCreateTicketPassengerNotFound() {
        when(passengerRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            ticketService.createTicket(1L, 1L);
        });

        assertEquals("Passenger not found", exception.getMessage());
    }
}