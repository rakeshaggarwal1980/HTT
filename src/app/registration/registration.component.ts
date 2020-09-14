import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { Registration } from './shared/registration.model';
import { isNullOrUndefined } from 'util';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { Router, FormGroup, FormBuilder, Validators } from 'vendor/angular';


@Component({
  selector: 'evry-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./shared/registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  today: Date;
  registration: any = { id: 0, name: '', email: '', password: '', employeeCode: '', roleId: 0 };
  isGetting: boolean = false;
  registrationForm: FormGroup;
  submitted: boolean = false;
  roles: any[] = [];

  constructor(private registrationService: RegistrationService, private router: Router,
    private snackBarService: SnackBarService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.generateForm();
    this.getRoles();

  }

  private generateForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      employeeCode: ['', Validators.required],
      roleId: ['', Validators.required]
    });
  }


  getRoles() {
    this.registrationService.getRoles().subscribe(
      data => {
        if (!isNullOrUndefined(data)) {
          if (data.body.length > 0) {
            this.roles = data.body;
            console.log('these are roles');
            console.log(this.roles);

          }
        } else {
        }
      },
      err => {
        //// this.isGetting = false;
        if (err.status === 401) {
          console.log('error');
        }
      }
    );


  }
  isControlInValid(control: string) {
    return this.submitted && !this.registrationForm.controls[control].valid;
  }



  onRegistrationClick(registrationForm: any) {

    if (registrationForm.valid) {
      //this.isGetting = true;
      localStorage.setItem('auth_token', '');
      this.isGetting = true;
      console.log(registrationForm.value);
      this.registrationService.createEmployee(registrationForm.value).subscribe(
        data => {

          this.isGetting = false;
          if (!isNullOrUndefined(data)) {

            if (!isNullOrUndefined(data.body)) {
              this.snackBarService.showSuccess('You have been registered successfully! Your account will be activated by Administrator shortly.');
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
