import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/shared/login.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'evry-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./shared/login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginDetails: any = { email:'', password: '' };

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-bg');
  }

  onLoginClick() {
    console.log('this is login');
    console.log(this.loginDetails);

    //this.isGetting = true;

    this.loginService.login(this.loginDetails).subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          console.log('login data not null');
          //  this.navigateToURL();
          console.log(data);
          localStorage.setItem('auth_token', data.body.token);
        } else {
          //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
        }
      },
      err => {
        //// this.isGetting = false;
        if (err.status === 401) {
          console.log('error');
          // this.messageKey = 'landingPage.menu.login.invalidCredentials';
        }
      }
    );

  }
}
