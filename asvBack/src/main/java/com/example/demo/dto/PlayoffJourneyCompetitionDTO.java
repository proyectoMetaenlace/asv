package com.example.demo.dto;

public class PlayoffJourneyCompetitionDTO extends CompetitionDTO {


	private String journey;
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
