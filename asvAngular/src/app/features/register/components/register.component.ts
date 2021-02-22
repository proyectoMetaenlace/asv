import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Idle } from '@ng-idle/core';
import { AuthenticationService } from 'src/app/shared/services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    idleState = 'Not started.';
    timedOut = false;
    error = '';

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    get f() { return this.registerForm.controls; }

    register(form: NgForm) {
        this.submitted = true;
        if (form.invalid) {
          this.notificationService.showWarning("Alert", "Please enter a username, password and email address");
          return;
        }
        this.loading = true;
        this.authenticationService.registrar(form.controls.username.value, form.controls.password.value, form.controls.email.value)
            .subscribe(
                data => {
                    if (data == null) {
                        this.notificationService.showError("Error", "There was an error registering the user")
                    }
                    else {
                      this.notificationService.showSuccess("Action completed", "The user was successfully registered")
                      this.router.navigate(["/login"]);
                    }
                },
                error => {
                    this.notificationService.showError("Error", "There was an error registering the user")
                    this.error = error;
                    this.loading = false;
                });
    }


    back() {
        this.router.navigate(["/login"]);
    }

}
