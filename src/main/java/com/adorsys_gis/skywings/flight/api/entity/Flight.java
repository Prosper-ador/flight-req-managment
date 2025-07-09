package com.adorsys_gis.skywings.flight.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "flights")
public class Flight {
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

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }
    public String getDepartureAddress() { return departureAddress; }
    public void setDepartureAddress(String departureAddress) { this.departureAddress = departureAddress; }
    public String getDestinationAddress() { return destinationAddress; }
    public void setDestinationAddress(String destinationAddress) { this.destinationAddress = destinationAddress; }
    public LocalDateTime getKickoffDateTime() { return kickoffDateTime; }
    public void setKickoffDateTime(LocalDateTime kickoffDateTime) { this.kickoffDateTime = kickoffDateTime; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public List<Ticket> getTickets() { return tickets; }
    public void setTickets(List<Ticket> tickets) { this.tickets = tickets; }
}