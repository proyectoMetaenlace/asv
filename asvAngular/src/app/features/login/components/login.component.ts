import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/services/notification/notification.service';

import { Idle } from '@ng-idle/core';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';
import { UserControllerService } from 'asv-api-client';
import { LoginDTO } from 'src/app/shared/model/auth/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    idleState = 'Not started.';
    timedOut = false;
    error = '';

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private userService: UserControllerService, private idle: Idle) {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "";
    }

    get f() { return this.loginForm.controls; }

    login(form: NgForm) {

        this.submitted = true;
        if (form.invalid) {
          this.notificationService.showWarning("Alert", "Please, enter your username and password");
          return;
        }

        this.loading = true;
        var loginDTO : LoginDTO = new LoginDTO();
        loginDTO.username = form.controls.username.value;
        loginDTO.password = form.controls.password.value;
        this.userService.loginUsingPOST(loginDTO)
            .subscribe(
                data => {
                    if (data == null) {
                        this.notificationService.showError("Error", "Incorrect login or password")
                    }
                    else {
                        sessionStorage.setItem('currentUser', JSON.stringify(data));
                        this.idle.watch();
                        this.idleState = 'Started.';
                        this.timedOut = false;
                        this.router.navigate([this.returnUrl]);
                    }
                },
                error => {
                    this.notificationService.showError("Error", "Incorrect login or password")
                    this.error = error;
                    this.loading = false;
                });
    }


    logOut() {
        this.authenticationService.logout();
        this.router.navigate(["/"]);
    }

    goToRegistro() {
        this.router.navigate(["/register"]);
    }

}
