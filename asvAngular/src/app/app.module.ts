import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceSettings } from './service-settings';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogService } from './shared/services/confirmation-dialog/confirmation-dialog.service';
import { RegisterComponent } from './features/register/components/register.component';
import { LoginComponent } from './features/login/components/login.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { DetailsButtonsComponent } from './shared/components/detailsbuttons/detailsbuttons.component';
import { ManagementCompetitionComponent } from './features/competition/components/managementcompetition/managementcompetition.component';
import { DetailsCompetitionComponent } from './features/competition/components/detailscompetition/detailscompetition.component';
import { ManagementTeamComponent } from './features/team/components/managementteam/managementteam.component';
import { DetailsTeamComponent } from './features/team/components/detailsteam/detailsteam.component';
import { ManagementButtonsComponent } from './shared/components/managementbuttons/managementbuttons.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from './features/user/components/users.component';
import { MatSortModule } from '@angular/material/sort';
import { AuthenticationService } from './shared/services/auth/auth.service';
import { ApiModule, BASE_PATH } from 'asv-api-client';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './util/authinterceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementTeamComponent,
    DetailsTeamComponent,
    ManagementCompetitionComponent,
    DetailsCompetitionComponent,
    RegisterComponent,
    UsersComponent,
    ManagementButtonsComponent,
    DetailsButtonsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    ApiModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4200'],
      },
    }),
    NgIdleKeepaliveModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
    }),
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ManagementTeamComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador, Role.Cliente] }*/,
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'managementteam',
        component: ManagementTeamComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador, Role.Cliente] }*/,
      },
      {
        path: 'detailsteam/:id',
        component: DetailsTeamComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador] }*/,
      },
      {
        path: 'managementcompetition',
        component: ManagementCompetitionComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador, Role.Cliente] }*/,
      },
      {
        path: 'detailscompetition/:id',
        component: DetailsCompetitionComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador] }*/,
      },
      {
        path: 'users',
        component: UsersComponent /*, pathMatch: 'full', canActivate: [AuthguardService], data: { roles: [Role.Administrador] }*/,
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    ConfirmationDialogService,
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    ServiceSettings,
    AuthenticationService,
    /*{ provide: BASE_PATH, useValue: environment.basePath }*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class AppModule {
  constructor(
    private http: HttpClient,
    private configuration: ServiceSettings
  ) {
    console.log('APP STARTING');
    this.http.get('../assets/settings.json').subscribe((res: any) => {
      configuration.baseURL = res.ServiceSettings.baseURL;
      configuration.version = res.ServiceSettings.version;
    });
  }
}
