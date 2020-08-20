import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { Registration } from './shared/registration.model';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'evry-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./shared/registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  today: Date;
  registration: Registration = { id: 0, name: '', email: '', password: '', employeeCode: 0 };


  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.today = new Date();
  }

  onRegistrationClick() {
    console.log('this is registration');
    console.log(this.registration);

    //this.isGetting = true;

    this.registrationService.createEmployee(this.registration).subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          console.log('registration data not null');
          //  this.navigateToURL();
          console.log(data);
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
