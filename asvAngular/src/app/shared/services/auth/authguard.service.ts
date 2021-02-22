import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';

import { AuthenticationService } from '../../services/auth/auth.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(private router: Router, 
    private notificationService : NotificationService,
    private authService: AuthenticationService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
          this.router.navigate(['/']);
          this.notificationService.showError("Recurso restringido", "Usted no tiene permisos para consultar este recurso.");
          return false;
      }
      return true;
  }
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;    
  }*/
  return true;
}