package com.adorsys_gis.skywings.flight.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "flights")
public class Flight {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Flight number is mandatory")
    @Column(nullable = false, unique = true)
    private String flightNumber;

    @NotBlank(message = "Departure address is mandatory")
    @Column(nullable = false)
    private String departureAddress;

    @NotBlank(message = "Destination address is mandatory")
    @Column(nullable = false)
    private String destinationAddress;

    @NotNull(message = "Kickoff datetime is mandatory")
    @Column(nullable = false)
    private LocalDateTime kickoffDateTime;

    @NotNull(message = "Duration is mandatory")
    @Column(nullable = false)
    private Integer duration;

    @NotNull(message = "Price is mandatory")
    @DecimalMin(value = "0.0", message = "Price must be non-negative")
    @Column(nullable = false)
    private BigDecimal price;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Ticket> tickets = new ArrayList<>();

}