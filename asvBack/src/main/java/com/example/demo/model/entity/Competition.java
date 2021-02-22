package com.example.demo.model.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "COMPETITION")
@Inheritance(strategy = InheritanceType.JOINED)
public class Competition implements Serializable {
	
    @Id
    @GeneratedValue(generator="competitionSequence") 
    @SequenceGenerator(name="competitionSequence",sequenceName="competition_seq", allocationSize=1)
    private Long id;
    
    @Column(name = "NAME", nullable = false)
    private String name;
    
    @Column(name = "COMPETITION_YEAR", nullable = false)
    private Integer competitionYear;
    
    @Column(name = "WINNER")
    private Long idWinner;
    
    @ManyToMany(mappedBy = "competitions")
    private Set<Team> teams;
    
	@ManyToOne
	@JoinColumn(name = "WINNER", insertable = false, updatable = false)
	private Team winner;
	
	@Transient
	private String type;

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

	public Long getIdWinner() {
		return idWinner;
	}

	public void setIdWinner(Long idWinner) {
		this.idWinner = idWinner;
	}

	public Set<Team> getTeams() {
		return teams;
	}

	public void setTeams(Set<Team> teams) {
		this.teams = teams;
	}

	public Team getWinner() {
		return winner;
	}

	public void setWinner(Team winner) {
		this.winner = winner;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	
    
    

}
