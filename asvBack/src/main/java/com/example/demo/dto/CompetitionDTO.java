package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;

public class CompetitionDTO {

	private Long id;

	private String name;

	private Integer competitionYear;

	private String type;

	@JsonIgnore
	private Set<TeamDTO> teams;

	@JsonIgnore
	private TeamDTO winner;

	private String nameWinner;

	public Set<TeamDTO> getTeams() {
		return teams;
	}

	public void setTeams(Set<TeamDTO> teams) {
		this.teams = teams;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getCompetitionYear() {
		return competitionYear;
	}

	public void setCompetitionYear(Integer competitionYear) {
		this.competitionYear = competitionYear;
	}

	public Set<TeamDTO> getTeamsDTO() {
		return teams;
	}

	public void setTeamsDTO(Set<TeamDTO> teams) {
		this.teams = teams;
	}

	public TeamDTO getWinner() {
		return winner;
	}

	public void setWinner(TeamDTO winner) {
		this.winner = winner;
	}

	public String getNameWinner() {
		return nameWinner;
	}

	public void setNameWinner(String nameWinner) {
		this.nameWinner = nameWinner;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}




}
