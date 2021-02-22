import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ServiceSettings } from './service-settings';
import { AuthenticationService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Football competitions';
  timedOut = false;
  private config: ServiceSettings;
  lastPing?: Date = null;
  notLogging: boolean;
  fooSubject: Subject<any> = new Subject<any>();
  fooStream: Observable<any> = this.fooSubject.asObservable();

  constructor(public auth: AuthenticationService,
    private router: Router, configuration: ServiceSettings) {

    this.config = configuration;
}

get isLoged(){
  return this.auth.isLoggedIn();

}  

logout(){
  if(this.isLoged){
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}

isNotLogging() {
    if (this.router.url.indexOf("/login") >= 0)
        return false;
    else
        return true;
}
}
