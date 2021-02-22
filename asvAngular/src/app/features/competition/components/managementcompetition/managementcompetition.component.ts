import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompetitionControllerService, CompetitionDTO } from 'asv-api-client';
import { Competition } from 'src/app/shared/model/competition';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { PaginationService } from 'src/app/shared/services/base/pagination.service';
import { CompetitionService } from 'src/app/shared/services/competition/competition.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog/confirmation-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { SearchCompetition } from '../../../../shared/model/filter/searchCompetition';

@Component({
  selector: 'app-managementcompetition',
  templateUrl: './managementcompetition.component.html',
  styleUrls: ['./managementcompetition.component.css'],
})
export class ManagementCompetitionComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['name', 'yearCompetition', 'nameWinner'];

  param: SearchCompetition = new SearchCompetition();
  competitionSelect = new Array();
  dataSource: MatTableDataSource<Competition>;
  isLoading: boolean;
  totalCount: number;

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    year: new FormControl(),
  });

  constructor(
    private router: Router,
    public paginationService: PaginationService,
    private notificationService: NotificationService,
    private confirmationDialogService: ConfirmationDialogService,
    public authService: AuthenticationService,
    public competitionService: CompetitionControllerService,
    private httpClient: HttpClient
  ) {
    //this.isLoading = true;
  }

  ngOnInit(): void {
    this.param.name = '';
    this.param.year = undefined;
    this.param.winnerTeam = '';
    //this.getAllCompeticiones();
    this.getAllCompetitions();
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

  transforDTO(data: CompetitionDTO[]) {
    let competitions = Array<Competition>();
    for (let i = 0; i < data.length; i++) {
      let competition = new Competition();
      competition.id = data[i].id;
      competition.name = data[i].name;
      competition.yearCompetition = data[i].competitionYear;
      competition.nameWinner = data[i].nameWinner;
      competitions.push(competition);
    }
    return competitions;
  }

  getAllCompetitions() {
      this.competitionService.getCompetitionsUsingGET().subscribe((data) => {
        if (data) {
          console.log(data);
          this.isLoading = false;
          this.totalCount = data.length;
          let competitions = this.transforDTO(data);
          this.initDatasource(competitions);
          this.competitionSelect = new Array();
        } else {
          this.isLoading = false;
          this.notificationService.showError('Error', (data as any).message);
        }
      });
  }


  gotoCreate() {
    this.router.navigate(['/detailscompetition/0']);
  }

  gotoEdit() {
    if (this.competitionSelect.length == 1) {
      this.router.navigate([
        '/detailscompetition',
        this.competitionSelect[0].id,
      ]);
    } else if (this.competitionSelect.length == 0) {
      this.notificationService.showWarning(
        'Alert',
        'You must select a competition to edit.'
      );
    } else {
      this.notificationService.showWarning(
        'Alert',
        'You must select only one competition to edit.'
      );
    }
  }

  onDelete() {
    if (this.competitionSelect.length > 0) {
      var mensaje = '';
      if (this.competitionSelect.length == 1) {
        mensaje = 'Do you want to delete the selected competition?';
      } else {
        mensaje =
          'Do you want to delete the  ' +
          this.competitionSelect.length +
          ' selected competitions?';
      }
      this.confirmationDialogService
        .confirm('Please, confirm elimination', mensaje)
        .then((confirmed) => {
          if (confirmed) {
            var ids = new Array();
            var validadas = 0;
            for (let i = 0; i < this.competitionSelect.length; i++) {
              const element = this.competitionSelect[i];
              ids.push(element.id);
              
              this.httpClient.delete<any>(environment.basePath + '/api/competitions/' + element.id)
                .subscribe((data) => {
                  this.notificationService.showSuccess("Success", "The competition has been deleted successfully.");
                  this.getAllCompetitions();
                });
            }
          }
        })
        .catch(() =>
          console.log(
            'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
          )
        );
    } else if (this.competitionSelect.length == 0) {
      this.notificationService.showWarning(
        'Alert',
        'You must select a competition to eliminate'
      );
    }
  }

  highlight(row) {
    for (let i = 0; i < this.competitionSelect.length; i++) {
      const element = this.competitionSelect[i];
      if (element.id == row.id) {
        this.competitionSelect.splice(i, 1);
        row.highlighted = !row.highlighted;

        return;
      }
    }
    this.competitionSelect.push(row);
    row.highlighted = !row.highlighted;
    console.log(this.competitionSelect);
  }

  filter() {
    let filter = ''; //crea filtro
    let competitions : Array<Competition> = new Array<Competition>();
    this.competitionService.getCompetitionsUsingGET().subscribe((data) => {
      if (data) {
        console.log(data);
        let competitionsDataSource = this.transforDTO(data);
        this.isLoading = false;
        if (
          this.form.get('name').value != null &&
          this.form.get('name').value != '' &&
          this.form.get('year').value == null
        ) {
          competitions = competitionsDataSource.filter(c => c.name.toLowerCase().includes(this.form.get('name').value.toLowerCase()));
        } else if (
          this.form.get('year').value != null &&
          this.form.get('year').value != '' &&
          this.form.get('name').value == null
        ) {
          competitions = competitionsDataSource.filter(c => c.yearCompetition == this.form.get('year').value);
        } else if (
          this.form.get('year').value != null &&
          this.form.get('year').value != '' &&
          this.form.get('name').value != null &&
          this.form.get('name').value != ''
        ) {
          competitions = competitionsDataSource.filter(c => c.name.toLowerCase().includes(this.form.get('name').value.toLowerCase()) && c.yearCompetition == this.form.get('year').value);
        }
        this.totalCount = competitions.length;
        this.initDatasource(competitions);
        this.competitionSelect = new Array();
      } else {
        this.isLoading = false;
        this.notificationService.showError('Error', (data as any).message);
      }
    });
    
  }

  clean() {
    this.getAllCompetitions();
    this.form.get('name').setValue(null);
    this.form.get('year').setValue(null);
  }
}
