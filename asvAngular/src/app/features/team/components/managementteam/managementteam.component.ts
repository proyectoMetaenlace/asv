import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/model/team';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { PaginationService } from 'src/app/shared/services/base/pagination.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog/confirmation-dialog.service';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

import { SearchTeam } from '../../../../shared/model/filter/searchTeam';
import { FormControl, FormGroup } from '@angular/forms';
import { CompetitionControllerService, CompetitionDTO, TeamControllerService, TeamDTO } from 'asv-api-client';
import { Competition } from 'src/app/shared/model/competition';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-managementteam',
  templateUrl: './managementteam.component.html',
  styleUrls: ['./managementteam.component.css']
})
export class ManagementTeamComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['shieldPhoto', 'name', 'country', 'nameHistoricalRivalTeam', 'numChampionsLeague'];
  
  param: SearchTeam = new SearchTeam;
  teamsSelected = new Array();
  dataSource: MatTableDataSource<Team>;
  isLoading: boolean;
  totalCount: number;

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    country: new FormControl(),
  });

  constructor(private equipoService: TeamService,
    private router: Router,
    public paginationService: PaginationService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    public authService: AuthenticationService,
    public teamService: TeamControllerService,
    private httpClient: HttpClient) { 
      //this.isLoading = true;
    }

  ngOnInit(): void {
    this.param.name = "";
    this.param.country = "";
    this.param.historialRivalTeam = "";
    this.getAllTeams();
  }

  initDatasource(data: any) {
    if (data) {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.notificationService.notificationResponse(data, false);

  }

  transforDTO(data: TeamDTO[]){
    let teams =Array<Team>();
      for(let i=0; i< data.length; i++ ){
        let team = new Team();
        team.id = data[i].id;
        team.name = data[i].name
        team.country = data[i].country;
        team.shieldPhoto = environment.basePath + "/api/shield/" + team.id + "/teams"; 
        team.nameHistoricalRivalTeam = data[i].nameHistRivalTeam;
        team.numChampionsLeague = data[i].numChampionsLeague;
        let competitions = new Array<Competition>();
        for(let j=0; j< data[i].competitionsDTO.length; j++){
          let competition = new Competition();
          competition.id =  data[i].competitionsDTO[j].id;
          competition.name =  data[i].competitionsDTO[j].name;
          competition.yearCompetition =  data[i].competitionsDTO[j].competitionYear;
          competitions.push(competition);
        }
        team.competitions = competitions;
        teams.push(team);
      }
      return teams;
  }

  getAllTeams(filter?: string) {
    if(filter){
      this.httpClient.get<any>(environment.basePath + '/api/teams?filter=' + filter).subscribe(
        data => {
          if (data) {
            this.isLoading = false;
            this.totalCount = data.length;
            let teams = this.transforDTO(data);
            this.initDatasource(teams);
            this.teamsSelected = new Array();
          }
          else {
            this.isLoading = false;
            this.notificationService.showError("Error", (data as any).message);
          }
        }
      );
    }else{
      this.teamService.getTeamsUsingGET().subscribe(
        data => {
          if (data) {
            this.isLoading = false;
            this.totalCount = data.length;
            let teams = this.transforDTO(data);
            this.initDatasource(teams);
            this.teamsSelected = new Array();
          }
          else {
          this.isLoading = false;
          this.notificationService.showError("Error", (data as any).message);
          }
        }
      );
    } 
  }

  onSearch() {
    this.dataSource = new MatTableDataSource();
    this.isLoading = true;
    this.teamsSelected = new Array();
    for (let i = 0; i < this.teamsSelected.length; i++) {
      const element = this.teamsSelected[i];
      element.highlighted = undefined;
    }
  }

  onClearSearch() {
    this.param = new SearchTeam;
    this.param.name = "";
    this.param.country = "";
    this.param.historialRivalTeam = "";
    this.onSearch();
    this.notificationService.showSuccess('Action completed', 'The filters have been cleaned.');
   }

  gotoCreate(){
    this.router.navigate(['/detailsteam/0']);
  }

  gotoEdit(){
    if (this.teamsSelected.length == 1) {
      this.router.navigate(['/detailsteam', this.teamsSelected[0].id ]);
    }
    else if (this.teamsSelected.length == 0) {
      this.notificationService.showWarning("Alert", "You must select a team to edit.");
    } else {
      this.notificationService.showWarning("Alert", "You must select only one team to edit.");
    }
  }

  onDelete() {   
    this.notificationService.showWarning("Alert", "This functionality has not yet been implemented, but in competitions it is implemented.");
    return;
  }

  highlight(row) {
    for (let i = 0; i < this.teamsSelected.length; i++) {
      const element = this.teamsSelected[i];
      if (element.id == row.id) {
        this.teamsSelected.splice(i, 1);
        row.highlighted = !row.highlighted;

        return;
      }
    }
    this.teamsSelected.push(row);
    row.highlighted = !row.highlighted;
  }

  filter(){
    let filter = "" //crea filtro
    if( this.form.get('name').value != null &&  this.form.get('name').value != "" && this.form.get('country').value == null){
      filter = "{\"name\": \""+this.form.get('name').value+"\"}";
    } 
    else if( this.form.get('country').value != null &&  this.form.get('country').value != "" && this.form.get('name').value == null){
      filter = "{\"country\": \""+this.form.get('country').value+"\"}";
    }
    else if( this.form.get('country').value != null &&  this.form.get('country').value != ""
           && this.form.get('name').value != null && this.form.get('name').value != "" ){
      filter = "{\"name\": \""+this.form.get('name').value+"\",\"country\": \""+this.form.get('country').value+"\"}";
    }
    filter = btoa(filter);
    this.getAllTeams(filter);
  }

  clean(){
    this.getAllTeams();
    this.form.get('name').setValue(null);
    this.form.get('country').setValue(null);
  }



}
