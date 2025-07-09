package com.adorsys_gis.skywings.flight.api.repository;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t FROM Ticket t WHERE t.flight.departureAddress = :departure AND t.flight.destinationAddress = :destination AND t.flight.kickoffDateTime >= :kickoff")
    List<Ticket> searchTickets(@Param("departure") String departure, @Param("destination") String destination, @Param("kickoff") LocalDateTime kickoff);
}
