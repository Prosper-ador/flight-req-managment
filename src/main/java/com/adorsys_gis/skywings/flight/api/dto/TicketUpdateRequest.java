package com.adorsys_gis.skywings.flight.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketUpdateRequest {
    @NotBlank(message = "Status is mandatory")
    private String status;
}