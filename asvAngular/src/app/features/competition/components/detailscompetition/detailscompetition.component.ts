import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/model/competition';
import { Team } from 'src/app/shared/model/team';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { CompetitionService } from 'src/app/shared/services/competition/competition.service';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { CompetitionControllerService, JourneyCompetitionControllerService, JourneyCompetitionDTO, PlayoffCompetitionControllerService, PlayoffCompetitionDTO, PlayoffJourneyCompetitionControllerService, PlayoffJourneyCompetitionDTO, TeamControllerService } from 'asv-api-client';
import { JourneyCompetitionViewDTO } from 'src/app/shared/model/journeycompetition';
import { PlayoffCompetitionViewDTO} from 'src/app/shared/model/playoffcompetition';
import { PlayoffJourneyCompetitionViewDTO} from 'src/app/shared/model/playoffjourneycompetition';

@Component({
  selector: 'app-detailscompetition',
  templateUrl: './detailscompetition.component.html',
  styleUrls: ['./detailscompetition.component.css']
})
export class DetailsCompetitionComponent implements OnInit {

  action: string = "New";
  idCompetition: string;
  competition: Competition = new Competition();
  teams: Team[] = [];
  submitted = false;

  
  constructor(private route: ActivatedRoute,
    private teamService: TeamControllerService,
    private notificationService: NotificationService,
    private competitionService: CompetitionControllerService,
    public authService: AuthenticationService,
    public jouneyService: JourneyCompetitionControllerService,
    public playoffService: PlayoffCompetitionControllerService,
    public playoffJourneyService: PlayoffJourneyCompetitionControllerService,
    public router: Router) { }

  
  ngOnInit(): void {
    
    this.idCompetition = this.route.snapshot.paramMap.get('id');
    this.getAllTeams();
    if (this.idCompetition != "0"){
      this.getCompetition(this.idCompetition);
      this.action="Edit";
    } else {
      this.competition.idTeamWinner=undefined;
    }
  }

  getAllTeams() {
    this.teamService.getTeamsUsingGET().subscribe(
      data => {
        if (data) {
          let teams = new Array<Team>();
          for(let i = 0; i< data.length; i++){
            
            let team = new Team();
            team.id = data[i].id;
            team.name = data[i].name;
            team.country = data[i].country;
            team.nameHistoricalRivalTeam = data[i].nameHistRivalTeam;
            teams.push(team);
          }
          this.teams = teams;
        }
      }
    );
  }

  
  initCompetition(data: any) {
    if (data) {
      this.competition = data;
      if (this.competition.type == "journey") {
        (document.getElementById('radioJourney-input') as HTMLFormElement).click();
        (document.getElementById('radioJourney-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioPlayoff-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioJourneyPlayoff-input') as HTMLFormElement).disabled = true;
      }
      else if (this.competition.type == "playoff") {
        (document.getElementById('radioPlayoff-input') as HTMLFormElement).click();
        (document.getElementById('radioJourney-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioPlayoff-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioJourneyPlayoff-input') as HTMLFormElement).disabled = true;
      }
      else if (this.competition.type == "journeyPlayoff") {
        (document.getElementById('radioJourneyPlayoff-input') as HTMLFormElement).click();
        (document.getElementById('radioJourney-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioPlayoff-input') as HTMLFormElement).disabled = true;
        (document.getElementById('radioJourneyPlayoff-input') as HTMLFormElement).disabled = true;
      }
    }
    this.notificationService.notificationResponse(data, false)
  }

  getCompetition(id) {
    if (id) {
      this.competitionService.getCompetitionUsingGET(id)
        .subscribe(data => { 
          console.log(data);
          let competition = new Competition();
          competition.id = data.id;
          competition.name = data.name;
          competition.yearCompetition = data.competitionYear;
          competition.idTeamWinner = data.nameWinner;
          competition.type = data.type;
          this.initCompetition(competition);
        });
    }
  }

  gotoSave() {
    if (this.competition && (this.competition.name == undefined || this.competition.name == "")) {
      this.notificationService.showWarning("Alert", "The name is required");
      return;
    }
    else if (this.competition && (this.competition.yearCompetition == undefined)) {
      this.notificationService.showWarning("Alert", "The year is required");
      return;
    }
    else if (this.competition && (this.competition.type == undefined || this.competition.type == "")) {
      this.notificationService.showWarning("Alert", "The type of competition is required");
      return;
    }
    else {
      if (this.idCompetition == "0") {
        switch (this.competition.type) {
          case "journey":
            let journey: JourneyCompetitionViewDTO = new JourneyCompetitionViewDTO();
            journey.competitionYear = this.competition.yearCompetition;
            journey.name = this.competition.name;
            this.jouneyService.createJourneyCompetitionUsingPOST(journey)
              .subscribe(data => {
                if (data) {
                  this.notificationService.showSuccess("Action completed", "The competition has been created successfully");
                  this.competition = new Competition;
                  this.router.navigate(['/managementcompetition']);
                } else {
                  this.notificationService.notificationResponse(data);
                }
              });
          break;
          case "playoff":
            let playoff: PlayoffCompetitionViewDTO = new PlayoffCompetitionViewDTO()
            playoff.competitionYear = this.competition.yearCompetition;
            playoff.name = this.competition.name;
            this.playoffService.createPlayoffCompetitionUsingPOST(playoff)
            .subscribe(data => {
              if (data) {
                this.notificationService.showSuccess("Action completed", "The competition has been created successfully");
                this.competition = new Competition;
                this.router.navigate(['/managementcompetition']);
              } else {
                this.notificationService.notificationResponse(data);
              }
            });
          break;
          case "journeyPlayoff":
            let playoffJourney: PlayoffJourneyCompetitionViewDTO = new PlayoffJourneyCompetitionViewDTO();
            playoffJourney.competitionYear = this.competition.yearCompetition;
            playoffJourney.name = this.competition.name;
            this.playoffJourneyService.createPlayoffJourneyCompetitionUsingPOST(playoffJourney)
            .subscribe(data => {
              if (data) {
                this.notificationService.showSuccess("Action completed", "The competition has been created successfully");
                this.competition = new Competition;
                this.router.navigate(['/managementcompetition']);
              } else {
                this.notificationService.notificationResponse(data);
              }
            });
          break;
        }
        
      }
      else {
        switch (this.competition.type) {
          case "journey":
            let journey: JourneyCompetitionDTO = new JourneyCompetitionViewDTO();
            journey.id = this.competition.id;
            journey.competitionYear = this.competition.yearCompetition;
            journey.name = this.competition.name;
            console.log('competition: ' + JSON.stringify(journey));
            this.jouneyService.updateJourneyCompetitionUsingPUT(journey, journey.id)
            .subscribe(data => {
              if (data) {
                this.notificationService.showSuccess("Action completed", "The competition has been edited correctly");
                this.router.navigate(['/managementcompetition']);
              } else {
                this.notificationService.notificationResponse(data);
              }
            });
          break;
          case "playoff":
            let playoff: PlayoffCompetitionViewDTO = new PlayoffCompetitionViewDTO()
            playoff.id = this.competition.id;
            playoff.competitionYear = this.competition.yearCompetition;
            playoff.name = this.competition.name;
            console.log('competition: ' + JSON.stringify(playoff));
            this.playoffService.updatePlayoffCompetitionUsingPUT(playoff, playoff.id)
            .subscribe(data => {
              if (data) {
                this.notificationService.showSuccess("Action completed", "The competition has been edited correctly");
                this.router.navigate(['/managementcompetition']);
              } else {
                this.notificationService.notificationResponse(data);
              }
            });
          break;
          case "journeyPlayoff":
            let playoffJourney: PlayoffJourneyCompetitionViewDTO = new PlayoffJourneyCompetitionViewDTO();
            playoffJourney.id = this.competition.id;
            playoffJourney.competitionYear = this.competition.yearCompetition;
            playoffJourney.name = this.competition.name;
            console.log('competition: ' + JSON.stringify(playoffJourney));
            this.playoffJourneyService.updatePlayoffJourneyCompetitionUsingPUT(playoffJourney, playoffJourney.id)
            .subscribe(data => {
              if (data) {
                this.notificationService.showSuccess("Action completed", "The competition has been edited correctly");
                this.router.navigate(['/managementcompetition']);
              } else {
                this.notificationService.notificationResponse(data);
              }
            });
          break;
        }

      }
    }
  }

  radioChange(event) {
    this.competition.type = event.value;
  }

}
