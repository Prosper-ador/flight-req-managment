package com.adorsys_gis.skywings.flight.api.repository;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {
    List<Ticket> findByPassengerEmail(String email);
}