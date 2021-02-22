import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team, TeamViewDTO } from 'src/app/shared/model/team';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { Competition } from 'src/app/shared/model/competition';
import { PaginationService } from 'src/app/shared/services/base/pagination.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompetitionDTO, TeamControllerService, TeamDTO } from 'asv-api-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detailsteam',
  templateUrl: './detailsteam.component.html',
  styleUrls: ['./detailsteam.component.css']
})
export class DetailsTeamComponent implements OnInit {
  action: string = "New";
  idTeam: string;
  team: TeamViewDTO = new TeamViewDTO();
  teams: TeamViewDTO[] = [];
  registerForm: FormGroup;
  submitted = false;
  imageName: string = "";
  selectedFiles: FileList;
  currentFile: File;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'yearCompetition'];
  dataSource: MatTableDataSource<CompetitionDTO>;
  totalCount: number;

  constructor(private route: ActivatedRoute,
    private teamService: TeamControllerService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public paginationService: PaginationService,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {

    this.idTeam = this.route.snapshot.paramMap.get('id');
    //this.getAllTeams();
    this.getAllTeams();
    if (this.idTeam != "0"){
      //this.getTeam(this.idTeam);
      this.getTeam(this.idTeam)
      this.action="Edit";
    } else{
      this.team.idHistoricalRivalTeam=undefined;
    }
  }

  getAllTeams() {
    this.teamService.getTeamsUsingGET().subscribe(
      data => {
        if (data) {
          
          let teams =Array<TeamDTO>();
          for(let i=0; i< data.length; i++ ){
            let team = new TeamViewDTO();
            team.id = data[i].id;
            team.name = data[i].name;
            team.country = data[i].country;
            team.idHistoricalRivalTeam = data[i].idHistoricalRivalTeam;
            team.nameHistRivalTeam = data[i].nameHistRivalTeam;
            team.shieldPhoto = environment.basePath + "/api/shield/" + team.id + "/teams";
            let competitions = new Array<Competition>();
            for(let j=0; j< data[i].competitionsDTO.length; j++){
              let competition = new Competition();
              competition.id =  data[i].competitionsDTO[j].id;
              competition.name =  data[i].competitionsDTO[j].name;
              competition.yearCompetition =  data[i].competitionsDTO[j].competitionYear;
              competitions.push(competition);
            }
            team.competitionsDTO = competitions;
            teams.push(team);
          }
          this.teams = teams;
        }
      }
    );
  }

  initTeam(data: TeamDTO) {
    if (data) {
      this.team = new Team();
      this.team.id = data.id;
      this.team.name = data.name;
      this.team.country = data.country;
      this.imageName = data.shieldPhoto;
      this.team.shieldPhoto = environment.basePath + "/api/shield/" + data.id + "/teams";
      this.team.nameHistRivalTeam = data.nameHistRivalTeam;
      if (data.idHistoricalRivalTeam != null)
        this.team.idHistoricalRivalTeam = data.idHistoricalRivalTeam;
      else {
        this.team.idHistoricalRivalTeam = undefined;
      }
      let competitions = new Array<Competition>();
      for(let i=0; i< data.competitionsDTO.length; i++){
        let competition = new Competition();
        competition.id =  data.competitionsDTO[i].id;
        competition.name =  data.competitionsDTO[i].name;
        competition.yearCompetition =  data.competitionsDTO[i].competitionYear;
        competitions.push(competition);
      }
      this.team.competitionsDTO = competitions;
      this.dataSource = new MatTableDataSource(this.team.competitionsDTO);
    }
    this.notificationService.notificationResponse(data, false)
  }

  getTeam(id) {
    if (id) {
      this.teamService.getTeamUsingGET(id)
        .subscribe(data => { 
          this.initTeam(data);
        });
    }
  }

  gotoSave() {
    if (this.team && (this.team.name == undefined || this.team.name == "")) {
      this.notificationService.showWarning("Alert", "The name is required");
      return;
    }
    else if (this.team && (this.team.country == undefined || this.team.country == "")) {
      this.notificationService.showWarning("Alert", "The country is required");
      return;
    }
    else {
      if (this.idTeam == "0") {
        let teamDTO: TeamViewDTO = new TeamViewDTO();
        teamDTO.name = this.team.name;
        teamDTO.country = this.team.country;
        teamDTO.nameHistRivalTeam = this.team.nameHistRivalTeam;
        teamDTO.idHistoricalRivalTeam = this.team.idHistoricalRivalTeam;
        this.teamService.createTeamUsingPOST(teamDTO)
          .subscribe(data => {
            if (data) {
              if (this.selectedFiles != null && this.selectedFiles.length > 0) {
                this.currentFile = this.selectedFiles.item(0);
                const formData : FormData = new FormData();
                formData.append('file', this.currentFile);
                this.httpClient.post<any>(environment.basePath + '/api/upload/' + data.id, formData).subscribe(
                  event => {
                    this.notificationService.showSuccess("Action completed", "The team has been created successfully");
                    this.team = new Team;
                    this.router.navigate(['/managementteam']);
                  },
                  err => {
                    this.notificationService.showError("Error", "The team couldn't been created successfully");
                  });
              } else {
                  this.notificationService.showSuccess("Action completed", "The team has been created successfully");
                  this.team = new Team;
                  this.router.navigate(['/managementteam']);
              }
              
            } else {
              this.notificationService.notificationResponse(data);
            }
          });
      }
      else {
        let teamDTO: TeamViewDTO = new TeamViewDTO();
        teamDTO.id = this.team.id;
        teamDTO.name = this.team.name;
        teamDTO.country = this.team.country;
        teamDTO.nameHistRivalTeam = this.team.nameHistRivalTeam;
        teamDTO.idHistoricalRivalTeam = this.team.idHistoricalRivalTeam;
        teamDTO.shieldPhoto = this.imageName;
        this.teamService.updateTeamUsingPUT(teamDTO, teamDTO.id)
          .subscribe(data => {
            if (data) {
              if (this.selectedFiles != null && this.selectedFiles.length > 0) {
                this.currentFile = this.selectedFiles.item(0);
                const formData : FormData = new FormData();
                formData.append('file', this.currentFile);
                this.httpClient.post<any>(environment.basePath + '/api/upload/' + this.team.id, formData).subscribe(
                  event => {
                    this.notificationService.showSuccess("Action completed", "The team has been updated successfully");
                    this.team = new Team;
                    this.router.navigate(['/managementteam']);
                  },
                  err => {
                    this.notificationService.showError("Error", "The team couldn't been updated successfully");
                  });
              } else {
                this.notificationService.showSuccess("Action completed", "The team has been updated successfully");
                this.team = new Team;
                this.router.navigate(['/managementteam']);
              }
                
            } else {
              this.notificationService.notificationResponse(data);
            }
          });
      }
    }
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  get f() { return this.registerForm.controls; }

}
