package com.example.demo.model.filter;

import javax.persistence.Column;

public class TeamSearchFilter {

  private String name;

  private String country;

  private String nameHistoricalRivalTeam;

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

  public String getNameHistoricalRivalTeam() {
    return nameHistoricalRivalTeam;
  }

  public void setNameHistoricalRivalTeam(String nameHistoricalRivalTeam) {
    this.nameHistoricalRivalTeam = nameHistoricalRivalTeam;
  }


}
