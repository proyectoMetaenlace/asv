package com.example.demo.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class PlayoffJourneyCompetition extends Competition {

    @Column(name = "JOURNEY")
    private String journey;
    
    @Column(name = "PLAYOFF")
    private String playoff;

	public String getJourney() {
		return journey;
	}

	public void setJourney(String journey) {
		this.journey = journey;
	}

	public String getPlayoff() {
		return playoff;
	}

	public void setPlayoff(String playoff) {
		this.playoff = playoff;
	}
}
