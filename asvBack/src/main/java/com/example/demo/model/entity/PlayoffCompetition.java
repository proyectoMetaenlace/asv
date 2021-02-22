package com.example.demo.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class PlayoffCompetition extends Competition {
	
    @Column(name = "PLAYOFF")
    private String playoff;

	public String getPlayoff() {
		return playoff;
	}

	public void setPlayoff(String playoff) {
		this.playoff = playoff;
	}


    
    

}
