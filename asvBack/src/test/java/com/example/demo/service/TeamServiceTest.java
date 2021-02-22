package com.example.demo.service;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.demo.dto.TeamDTO;
import com.example.demo.model.entity.Team;
import com.example.demo.repository.CompetitionRepository;
import com.example.demo.repository.TeamRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class TeamServiceTest {

	@TestConfiguration
	static class TeamServiceImplTestContextConfiguration {

		@Bean
		public TeamService teamService() {
			return new TeamServiceImpl();
		}

		@Bean
		public ModelMapper modelMapper() {
			return new ModelMapper();
		}
	}

	@Autowired
	private TeamService teamService;

	@MockBean
	private TeamRepository teamRepository;
	
	@MockBean
	private CompetitionRepository competitionRepository;

	//	@Mock
	//	ModelMapper modelMapper;

	@Test
	public void getTeamByIdTest() {
		Team team = new Team();
		team.setId((long) 1);
		team.setName("Real Madrid");
		team.setCountry("España");
		team.setIdHistoricalRivalTeam(2L);
		team.setCompetitions(new HashSet<>());
		Team historicalRival = new Team();
		historicalRival.setName("Barcelona");
		historicalRival.setId(2L);
		team.setHistoricalRivalTeam(historicalRival);

		when(teamRepository.findById((long) 1)).thenReturn(Optional.of(team));

		TeamDTO teamDTO = teamService.findById((long) 1);

		assertEquals("Real Madrid", teamDTO.getName());
		assertEquals("España", teamDTO.getCountry());

	}

	@Test
	public void createTeamTest() {
		TeamDTO teamDTO = new TeamDTO();
		teamDTO.setId((long) 1);
		teamDTO.setName("Real Madrid");
		teamDTO.setCountry("España");


		Team team = new Team();
		team.setId((long) 1);
		team.setName("Real Madrid");
		team.setCountry("España");

		when(teamRepository.save(team)).thenReturn(team);

		teamDTO = teamService.create(teamDTO);

		assertEquals("Real Madrid", teamDTO.getName());
		assertEquals("España", teamDTO.getCountry());

	}

	@Test
	public void getAllTeamsTest() {
		List<Team> list = new ArrayList<Team>();

		Team team1 = new Team();
		team1.setId((long) 1);
		team1.setName("Real Madrid");
		team1.setCountry("España");
		team1.setCompetitions(new HashSet<>());
		Team historicalRival = new Team();
		historicalRival.setName("Barcelona");
		historicalRival.setId(2L);
		team1.setHistoricalRivalTeam(historicalRival);

		Team team2 = new Team();
		team2.setId((long) 2);
		team2.setName("Barcelona");
		team2.setCountry("España");
		team2.setCompetitions(new HashSet<>());
		historicalRival = new Team();
		historicalRival.setName("Barcelona");
		historicalRival.setId(2L);
		team2.setHistoricalRivalTeam(historicalRival);

		Team team3 = new Team();
		team3.setId((long) 3);
		team3.setName("Real Murcia");
		team3.setCountry("España");
		team3.setCompetitions(new HashSet<>());
		historicalRival = new Team();
		historicalRival.setName("Barcelona");
		historicalRival.setId(2L);
		team3.setHistoricalRivalTeam(historicalRival);

		list.add(team1);
		list.add(team2);
		list.add(team3);

		when(teamRepository.findAll()).thenReturn(list);

		//test
		List<TeamDTO> teamList = teamService.findAll();

		assertEquals(3, teamList.size());
		verify(teamRepository, times(1)).findAll();
	}
}
