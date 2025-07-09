package com.adorsys_gis.skywings.flight.api.entity;

import jakarta.persistence.*;
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

    @Column(nullable = false, unique = true)
    private String flightNumber;

    @Column(nullable = false)
    private String departureAddress;

    @Column(nullable = false)
    private String destinationAddress;

    @Column(nullable = false)
    private LocalDateTime kickoffDateTime;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private BigDecimal price;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
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