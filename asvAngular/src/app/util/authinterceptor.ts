import { Injectable, NgZone } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap, switchMap, filter, take, first } from 'rxjs/operators';

import { ServiceSettings } from 'src/app/service-settings';
import { NotificationService } from '../shared/services/notification/notification.service';
import { AuthenticationService } from '../shared/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private isRefreshing = false;

  constructor(
    public authService: AuthenticationService,
    private jwth: JwtHelperService,
    private router: Router,
    private notificationService: NotificationService,
    private settings: ServiceSettings
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('interceptor');

    if (!this.authService.isLoggedIn()) {
      // this.isRefreshing = false;
      return next.handle(req);
    }

    if (this.authService.isLoggedIn() && !this.authService.isExpirado()) {
      return next.handle(
        this.addToken(req, this.authService.getAuthorizationToken())
      );
    }

    if (
      this.authService.isLoggedIn() &&
      this.authService.isExpirado() &&
      req.url.indexOf('Refresh') !== -1
    ) {
      return next.handle(
        this.addToken(req, this.authService.getAuthorizationToken())
      );
    } else {
      console.log('else interceptor');
      /* this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((authResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(authResponse.token);
          return next.handle(this.addToken(req, authResponse.token));
        })
      );*/
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }
}
