package com.example.demo.model.entity;


import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class JourneyCompetition extends Competition {
	
    @Column(name = "JOURNEY")
    private String journey;

	public String getDay() {
		return journey;
	}

	public void setJourney(String journey) {
		this.journey = journey;
	}


    
}
