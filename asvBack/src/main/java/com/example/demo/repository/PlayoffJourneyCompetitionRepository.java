package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.PlayoffJourneyCompetition;

@Repository
public interface PlayoffJourneyCompetitionRepository extends JpaRepository<PlayoffJourneyCompetition, Long> {

}