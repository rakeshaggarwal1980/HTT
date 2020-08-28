import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { Registration } from './shared/registration.model';
import { isNullOrUndefined } from 'util';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { Router } from 'vendor/angular';


@Component({
  selector: 'evry-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./shared/registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  today: Date;
  registration: any = { id: 0, name: '', email: '', password: '', employeeCode: '' };
  isGetting: boolean = false;

  constructor(private registrationService: RegistrationService, private router: Router,
    private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }

  onRegistrationClick(registrationForm: any) {
    console.log('this is registration');
    console.log(this.registration);

    if (registrationForm.valid) {
      //this.isGetting = true;
      localStorage.setItem('auth_token', '');
      this.isGetting = true;
      this.registrationService.createEmployee(this.registration).subscribe(
        data => {

            this.isGetting = false;
          if (!isNullOrUndefined(data)) {

            if (!isNullOrUndefined(data.body)) {
              this.snackBarService.showSuccess('You have been registered successfully!!');
              this.router.navigate(['']);

            } else {
              this.snackBarService.showError(data.message);
            }
          } else {
            this.isGetting = false;
            this.snackBarService.showError('Error');
            //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
          }
        },
        err => {
          //// this.isGetting = false;
          if (err.status === 401) {
            console.log('error');
            this.isGetting = false;
            this.snackBarService.showError('Error');
            // this.messageKey = 'landingPage.menu.login.invalidCredentials';
          }
        }
      );
    } else {
      this.isGetting = false;
      this.snackBarService.showError('Please enter mandatory valid fields.');
    }

  }
}
