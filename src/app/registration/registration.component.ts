import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { ErrorService, SnackBarService, SpinnerService } from 'app/shared/index.shared';
import { Router, FormGroup, FormBuilder, Validators } from 'vendor/angular';
import { RESPONSE_STATUS_ENUM } from '../app.enum';


@Component({
  selector: 'evry-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./shared/registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: boolean = false;
  hasCreated : boolean = true;
  constructor(private registrationService: RegistrationService, private router: Router,
    private snackBarService: SnackBarService, private fb: FormBuilder, private errorService: ErrorService,
    private spinnerService: SpinnerService ) {
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      employeeCode: ['', Validators.required],
      currentResidentialAddress: ['', Validators.required],
      permanentResidentialAddress: ['', Validators.required]
    });
  }

  isControlInValid(control: string) {
    return this.submitted && !this.registrationForm.controls[control].valid;
  }

  onRegistrationClick(registrationForm: any) {
    this.spinnerService.startRequest();
    if (registrationForm.valid) {
      this.registrationService.createEmployee(registrationForm.value).subscribe(
        data => {
          this.spinnerService.endRequest();
          if (data !== null && data !== undefined) {
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
              this.snackBarService.showSuccess('You have been registered successfully! Your account will be activated by Administrator shortly.');
              this.hasCreated = true;
            } else if(data.status === RESPONSE_STATUS_ENUM.FAILED){
              this.snackBarService.showError(data.message);
            } else{
              this.errorService.handleFailure(data.statusCode);
            }
          }
        },
        err => {
          this.spinnerService.endRequest();
          this.errorService.handleError(err);
        }
      );
    } else {
      this.spinnerService.endRequest();
      this.snackBarService.showError('Please enter mandatory fields.');
    }
    this.submitted = true;
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
