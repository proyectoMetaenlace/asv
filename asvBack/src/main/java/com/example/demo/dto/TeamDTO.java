package com.example.demo.dto;

import com.example.demo.model.entity.Competition;
import java.util.Set;

public class TeamDTO {

  private Long id;

  private String name;

  private String country;

  private Long idHistoricalRivalTeam;

  private String shieldPhoto;

  private Set<CompetitionDTO> competitions;

  private String nameHistRivalTeam;

  private Long numChampionsLeague;

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

  public Set<CompetitionDTO> getCompetitionsDTO() {
    return competitions;
  }

  public void setCompetitionsDTO(Set<CompetitionDTO> competitions) {
    this.competitions = competitions;
  }

  public String getNameHistRivalTeam() {
    return nameHistRivalTeam;
  }

  public void setNameHistRivalTeam(String nameHistRivalTeam) {
    this.nameHistRivalTeam = nameHistRivalTeam;
  }

  public Long getNumChampionsLeague() {
    return numChampionsLeague;
  }

  public void setNumChampionsLeague(Long numChampionsLeague) {
    this.numChampionsLeague = numChampionsLeague;
  }
}
