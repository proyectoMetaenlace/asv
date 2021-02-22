package com.example.demo.model.entity;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TEAM")
public class Team implements Serializable{

    @Id
    @GeneratedValue(generator="teamSequence") 
    @SequenceGenerator(name="teamSequence",sequenceName="team_seq", allocationSize=1)
    private Long id;
    
    @Column(name = "NAME", nullable = false, unique = true)
    private String name;
    
    @Column(name = "COUNTRY", nullable = false)
    private String country;
    
    @Column(name = "HIST_RIVAL_TEAM")
    private Long idHistoricalRivalTeam;
    
    @Column(name = "SHIELD_PHOTO")
    private String shieldPhoto;
    
    @ManyToMany
    @JoinTable(
      name = "TEAM_COMPETITION",
      joinColumns = @JoinColumn(name = "TEAM_ID"),
      inverseJoinColumns = @JoinColumn(name = "COMPETITION_ID"))
    private Set<Competition> competitions;
    
	@ManyToOne
	@JoinColumn(name = "HIST_RIVAL_TEAM", insertable = false, updatable = false)
	private Team historicalRivalTeam;
	
	
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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Long getIdHistoricalRivalTeam() {
		return idHistoricalRivalTeam;
	}

	public void setIdHistoricalRivalTeam(Long idHistoricalRivalTeam) {
		this.idHistoricalRivalTeam = idHistoricalRivalTeam;
	}

	public String getShieldPhoto() {
		return shieldPhoto;
	}

	public void setShieldPhoto(String shieldPhoto) {
		this.shieldPhoto = shieldPhoto;
	}

	public Set<Competition> getCompetitions() {
		return competitions;
	}

	public void setCompetitions(Set<Competition> competitions) {
		this.competitions = competitions;
	}

	public Team getHistoricalRivalTeam() {
		return historicalRivalTeam;
	}

	public void setHistoricalRivalTeam(Team historicalRivalTeam) {
		this.historicalRivalTeam = historicalRivalTeam;
	}

  public Long getCountChampionsLeague() {
	  Long numChampionsLeague = getCompetitions().stream().filter(c -> c.getName().equalsIgnoreCase("Champions League") && c.getIdWinner().equals(this.id)).count();
	  return numChampionsLeague;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Team team = (Team) o;
    return Objects.equals(id, team.id) && Objects.equals(name, team.name) && Objects.equals(country, team.country)
        && Objects.equals(idHistoricalRivalTeam, team.idHistoricalRivalTeam) && Objects.equals(shieldPhoto, team.shieldPhoto);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, country, idHistoricalRivalTeam, shieldPhoto);
  }
}