import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserControllerService } from 'asv-api-client';
import { UserViewDTO } from 'src/app/shared/model/auth/user';
import { Competition } from 'src/app/shared/model/competition';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { PaginationService } from 'src/app/shared/services/base/pagination.service';
import { CompetitionService } from 'src/app/shared/services/competition/competition.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog/confirmation-dialog.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['username', 'name', 'lastname'];
  
  dataSource: MatTableDataSource<UserViewDTO>;
  isLoading: boolean;
  totalCount: number;

 
  
  constructor(private userService: UserControllerService,
    public paginationService: PaginationService,
    private notificationService: NotificationService,
    public authService: AuthenticationService) { 
    }

  ngOnInit(): void {
    this.getUsers();
  }

  initDatasource(data: any) {
    if (data) {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(JSON.stringify(data));
    }
    this.notificationService.notificationResponse(data, false);
  }

  getUsers(){
    let users = new Array<UserViewDTO>();
    this.userService.getAllUsersUsingGET().subscribe(data =>{
      if (data) {
        console.log(data);
        this.isLoading = false;
        for(let i = 0 ; i< data.length ; i++){
          let user = new UserViewDTO();
          user.id = data[i].id;
          user.username = data[i].username;
          user.name = data[i].name;
          user.lastName = data[i].lastName;
          users.push(user);
        }
        this.totalCount = data.length;
        this.initDatasource(data);
      }
      else {
        this.isLoading = false;
        this.notificationService.showError("Error", (data as any).message);
      }    
    })

  }

}
