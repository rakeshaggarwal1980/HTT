import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from 'app/change-password/shared/change-password.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';


@Component({
  selector: 'evry-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./shared/change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  isGetting: boolean = false;
  changePassword: any = {
    password: '',
    confirmPassword: ''

  };


  constructor(private snackBarService: SnackBarService, private spinnerService: SpinnerService, private changePasswordService: ChangePasswordService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }
  onChangePassword(changePasswordForm: any) {
    debugger;
    if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors == null) {
      this.snackBarService.showError('Please enter mandatory fields.');
    } else if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors.passwordCheck == 'failed') {
      this.snackBarService.showError('Passwords do not match');
    }
    else if (changePasswordForm.valid) {
      this.spinnerService.startLoading();
      let user = JSON.parse(localStorage.getItem('user'));
      //   this.request.employee.employeeCode = this.request.employeeCode;
      const resetPasswordModel = {
        token: '',
        password: changePasswordForm.value.passwords.password,
        confirmPassword: changePasswordForm.value.passwords.confirmPassword,
        email: user.email
      }
      debugger;
      this.changePasswordService.changePassword(resetPasswordModel).subscribe(
        data => {
          console.log('this is change data response');
          console.log(data);
          debugger;
          this.spinnerService.stopLoading();
          if (!isNullOrUndefined(data)) {
            debugger;
            if (data.statusCode == 200) {
              this.snackBarService.showSuccess('Your password has been changed successfully.');
              changePasswordForm.resetForm();
            }
            else {
              this.spinnerService.stopLoading();
              this.snackBarService.showError(data.message);
            }
          } else {
            this.spinnerService.stopLoading();
            this.snackBarService.showError('Error');
          }
        },
        err => {
      
          if (err.status > 300) {
            console.log('error');
            this.spinnerService.stopLoading();
            this.snackBarService.showError('Error');
          }
        }
      );
    }
    else {

      this.snackBarService.showError('Please enter mandatory fields.');
    }
  }
}
