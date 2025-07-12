package com.adorsys_gis.skywings.flight.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "tickets")
public class Ticket {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Passenger is mandatory")
    @ManyToOne
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    @NotNull(message = "Flight is mandatory")
    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @NotNull(message = "Booking date is mandatory")
    @Column(nullable = false)
    private LocalDateTime bookingDate;

    @NotNull(message = "Status is mandatory")
    @Column(nullable = false)
    private String status;

}