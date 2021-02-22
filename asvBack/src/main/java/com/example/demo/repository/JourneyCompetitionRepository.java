package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.entity.JourneyCompetition;

@Repository
public interface JourneyCompetitionRepository extends JpaRepository<JourneyCompetition, Long> {

}

