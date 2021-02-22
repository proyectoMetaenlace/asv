import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ServiceSettings } from 'src/app/service-settings';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserViewDTO } from '../../model/auth/user';
import { LoginDTO, RegistroDTO } from '../../model/auth/login';
import { JwtDto, UserControllerService, UserDTO } from 'asv-api-client';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<JwtDto>;
  public currentUser: Observable<JwtDto>;

  constructor(
    private http: HttpClient,
    private settings: ServiceSettings,
    private userService: UserControllerService,
    private jwtHelper: JwtHelperService
  ) {
    this.currentUserSubject = new BehaviorSubject<JwtDto>(
      JSON.parse(sessionStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtDto {
    return this.currentUserSubject.value;
  }

  public get currentUserId() {
    return 1;
    //return this.currentUserSubject.value.id;
  }

  public getAuthorizationToken() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && user.accessToken) return user.accessToken;
    return '';
  }

  login(username: string, password: string) {
    var loginDTO: LoginDTO = new LoginDTO();
    loginDTO.username = username;
    loginDTO.password = password;
    return this.userService.loginUsingPOST(loginDTO).pipe(
      map((data) => {
        return data;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    //TODO
  }

  isLoggedIn() {
    //let user = this.currentUserValue;
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user && user.accessToken) {
      return true;
    }
    return false;
  }

  isLoggedInExpiration() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (
      user &&
      user.accessToken &&
      !this.jwtHelper.isTokenExpired(user.accessToken)
    ) {
      return true;
    }
    return false;
  }

  isExpirado() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    let result = this.jwtHelper.isTokenExpired(user.accessToken);
    return result;
  }

  public get isAdmin() {
    /*let user = this.currentUserValue;
            if (user && user.role && user.role == "Administrador") {
                return true;
            }*/
    return true;
  }

  public registrar(username: string, password: string, email: string) {
    let userDTO: UserViewDTO = new UserViewDTO();
    userDTO.username = username;
    userDTO.password = password;
    userDTO.email = email;
    return this.userService.signupUsingPOST(userDTO);
  }
}
