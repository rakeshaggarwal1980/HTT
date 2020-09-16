import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService, ErrorService, SpinnerService } from 'app/shared/index.shared';
import { EntityStatus, RESPONSE_STATUS_ENUM } from 'app/app.enum';
import { UserAccountService } from '../shared/user-account.service';

@Component({
  selector: 'evry-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  employeeForm: FormGroup;
  user = null;
  submitted: boolean = false;
  constructor(private router: Router,
    private snackBarService: SnackBarService, private fb: FormBuilder, private errorService: ErrorService,
    private spinnerService: SpinnerService, private accountService: UserAccountService) {
  }

  ngOnInit() {
    this.bindUserDetail();
    this.generateForm();
  }

  bindUserDetail() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user === null || this.user.undefined) {
      this.router.navigate(['']);
    }
    console.log(this.user);
  }

  private generateForm() {
    this.employeeForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email],
      employeeCode: [this.user.employeeCode],
      currentResidentialAddress: [this.user.currentResidentialAddress, Validators.required],
      permanentResidentialAddress: [this.user.permanentResidentialAddress, Validators.required]
    });
  }

  isControlInValid(control: string) {
    return this.submitted && !this.employeeForm.controls[control].valid;
  }

  onSubmit(empForm: any) {
    debugger;
    this.spinnerService.startLoading();


    if (empForm.valid) {
      var model = {
        id: this.user.userId,
        currentResidentialAddress: empForm.value.currentResidentialAddress,
        email: empForm.value.email,
        employeeCode: empForm.value.employeeCode,
        name: empForm.value.name,
        permanentResidentialAddress: empForm.value.permanentResidentialAddress,
        roles:this.user.roles,
        status: EntityStatus.Accept
      }
      this.accountService.updateEmployee(model).subscribe(
        data => {
          this.spinnerService.stopLoading();
          if (data !== null && data !== undefined) {
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
              this.snackBarService.showSuccess('Your details have been updated');
            } else if(data.status === RESPONSE_STATUS_ENUM.FAILED){
              this.snackBarService.showError(data.message);
            } else{
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
}
