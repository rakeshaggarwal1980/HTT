import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'app/login/shared/login.service';
import { isNullOrUndefined } from 'util';
import { Router } from 'vendor/angular';
import { EntityStatus } from 'app/app.enum';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';


@Component({
  selector: 'evry-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./shared/login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginDetails: any = { email: '', password: '' };
  isGetting: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-bg');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');
  }

  onLoginClick(formData: any) {
    if (formData.valid) {
      this.isGetting = true;
      localStorage.setItem('auth_token', '');
      this.loginService.login(this.loginDetails).subscribe(
        data => {
          console.log('this is data');
          console.log(data);
          this.isGetting = false;
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {

              localStorage.setItem('auth_token', data.body.token);
              console.log('this is user');
              console.log(data.body);
              localStorage.setItem('user', JSON.stringify(data.body));
              this.router.navigate(['request']);

            }
            else {
              this.snackBarService.showError("Invalid credentials!!");
            }
          } else {
            this.snackBarService.showError("Invalid credentials!!");
            //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
          }
        },
        err => {
          this.isGetting = false;
          if (err.status === 401) {
            console.log('error');
            this.snackBarService.showError("Invalid credentials!!");
          }
          if (err.status === 403) {
            this.snackBarService.showError("Your account is inactive. Please contact administrator.");
          }
        }
      );
    } else {
      this.snackBarService.showError("Please enter mandatory fields.");
    }
  }
}
