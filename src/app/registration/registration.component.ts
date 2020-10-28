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
  constructor(private registrationService: RegistrationService, private router: Router,
    private snackBarService: SnackBarService, private fb: FormBuilder, private errorService: ErrorService,
    private spinnerService: SpinnerService) {
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
    this.spinnerService.startLoading();
    if (registrationForm.valid) {
      this.registrationService.createEmployee(registrationForm.value).subscribe(
        data => {
          this.spinnerService.stopLoading();
          if (data !== null && data !== undefined) {
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
              this.router.navigate(['/thanks/rgt']);
            } else if (data.status === RESPONSE_STATUS_ENUM.FAILED) {
              this.snackBarService.showError(data.message);
            } else {
              this.errorService.handleFailure(data.statusCode);
            }
          }
        },
        err => {
          this.spinnerService.stopLoading();
          this.errorService.handleError(err);
        }
      );
    } else {
      this.spinnerService.stopLoading();
      this.snackBarService.showError('Please enter mandatory fields.');
    }
    this.submitted = true;
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
