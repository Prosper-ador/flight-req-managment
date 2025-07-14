package com.adorsys_gis.skywings.flight.api.repository;

import com.adorsys_gis.skywings.flight.api.entity.Ticket;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class TicketSpecification {

    public static Specification<Ticket> filterTickets(
            Long passengerId,
            String departure,
            String destination,
            String status,
            LocalDateTime kickoffFrom,
            LocalDateTime kickoffTo
    ) {
        return (root, query, cb) -> {
            Predicate p = cb.conjunction();

            if (passengerId != null) p = cb.and(p, belongsToPassenger(passengerId).toPredicate(root, query, cb));
            if (departure != null) p = cb.and(p, hasDeparture(departure).toPredicate(root, query, cb));
            if (destination != null) p = cb.and(p, hasDestination(destination).toPredicate(root, query, cb));
            if (status != null) p = cb.and(p, hasStatus(status).toPredicate(root, query, cb));
            if (kickoffFrom != null) p = cb.and(p, hasKickoffAfter(kickoffFrom).toPredicate(root, query, cb));
            if (kickoffTo != null) p = cb.and(p, hasKickoffBefore(kickoffTo).toPredicate(root, query, cb));

            return p;
        };
    }

    // Modular Filters
    public static Specification<Ticket> belongsToPassenger(Long passengerId) {
        return (root, query, cb) -> cb.equal(root.get("passenger").get("id"), passengerId);
    }

    public static Specification<Ticket> hasDeparture(String departure) {
        return (root, query, cb) -> cb.equal(root.get("flight").get("departureAddress"), departure);
    }

    public static Specification<Ticket> hasDestination(String destination) {
        return (root, query, cb) -> cb.equal(root.get("flight").get("destinationAddress"), destination);
    }

    public static Specification<Ticket> hasStatus(String status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Ticket> hasKickoffAfter(LocalDateTime dateTime) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("flight").get("kickoffDateTime"), dateTime);
    }

    public static Specification<Ticket> hasKickoffBefore(LocalDateTime dateTime) {
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("flight").get("kickoffDateTime"), dateTime);
    }
}
