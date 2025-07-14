package com.adorsys_gis.skywings.flight.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequest {
    @NotNull(message = "Passenger ID is mandatory")
    private Long passengerId;

    @NotNull(message = "Flight ID is mandatory")
    private Long flightId;
}