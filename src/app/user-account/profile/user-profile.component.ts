import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { SnackBarService, ErrorService, SpinnerService } from 'app/shared/index.shared';
import { EntityStatus, RESPONSE_STATUS_ENUM } from 'app/app.enum';
import { UserAccountService } from '../shared/user-account.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'evry-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  employeeForm: FormGroup;
  user = null;
  previousUrl: string;
  submitted: boolean = false;
  constructor(private router: Router,
    private snackBarService: SnackBarService, private fb: FormBuilder, private errorService: ErrorService,
    private spinnerService: SpinnerService, private accountService: UserAccountService,
    private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.bindUserDetail();
    this.generateForm();
  }

  bindUserDetail() {
    let user = (localStorage.getItem('user'));
    if (user === null || user === undefined) {
      this.router.navigate(['']);
    } else {
      this.user = JSON.parse(user);
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
    this.spinnerService.startLoading();
    debugger;
    if (empForm.valid) {
      this.bindUserDetail();
      var model = {
        id: (this.user.userId !== null && this.user.userId !== undefined && this.user.userId !== '') ? this.user.userId : this.user.id,
        currentResidentialAddress: empForm.value.currentResidentialAddress,
        email: empForm.value.email,
        employeeCode: empForm.value.employeeCode,
        name: empForm.value.name,
        permanentResidentialAddress: empForm.value.permanentResidentialAddress,
        roles: this.user.roles,
        status: EntityStatus.Accept
      }
      this.accountService.updateEmployee(model).subscribe(
        data => {
          console.log('this is profile info');
          console.log(data);
          this.spinnerService.stopLoading();
          if (data !== null && data !== undefined) {
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
              this.snackBarService.showSuccess('Your details have been updated');
              this.user = data.body;
              localStorage.setItem('user', JSON.stringify(this.user));
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
    this.utilityService.previousUrl$.subscribe(url => {
      this.previousUrl = url.toString();
    });
    if (this.previousUrl !== '') {
      this.router.navigate([this.previousUrl]);
    }
  }
}
