import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from 'app/change-password/shared/change-password.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';


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


  constructor(private snackBarService: SnackBarService, private changePasswordService: ChangePasswordService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }


  // addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
  //   if (datePickerType.toLowerCase() == 'fromdate') {
  //     this.request.fromDate = new Date(event.value);
  //   } else if (datePickerType.toLowerCase() == 'todate') {
  //     this.request.toDate = new Date(event.value);
  //   }
  // }

  // isControlValid(dateType: string) {
  //   if (dateType.toLowerCase() == 'fromdate') {
  //     if (isNullOrUndefined(this.request.fromDate) || this.request.fromDate == '' || this.request.fromDate == 'Invalid date') {
  //       document.getElementById('fromDatePicker').classList.add('error-field-highlighter');
  //       return false;
  //     } else {
  //       document.getElementById('fromDatePicker').classList.remove('error-field-highlighter');
  //       return true;
  //     }
  //   }
  //   else if (dateType.toLowerCase() == 'todate') {
  //     if (isNullOrUndefined(this.request.toDate) || this.request.toDate == '' || this.request.toDate == 'Invalid date') {
  //       document.getElementById('toDatePicker').classList.add('error-field-highlighter');
  //       return false;
  //     } else {
  //       document.getElementById('toDatePicker').classList.remove('error-field-highlighter');
  //       return true;
  //     }
  //   }
  // }

  onChangePassword(changePasswordForm: any) {
    debugger;
    if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors == null) {
      this.snackBarService.showError('Please enter mandatory fields.');
    } else if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors.passwordCheck == 'failed') {
      this.snackBarService.showError('Passwords do not match');
    }
    else if (changePasswordForm.valid) {
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
          this.isGetting = false;
          if (!isNullOrUndefined(data)) {
            debugger;
            if (data.statusCode == 200) {
              this.snackBarService.showSuccess('Your password has been changed successfully.');
              changePasswordForm.resetForm();
            }
            else {
              this.isGetting = false;
              this.snackBarService.showError(data.message);
            }
          } else {
            this.isGetting = false;
            this.snackBarService.showError('Error');
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
    }
    else {

      this.snackBarService.showError('Please enter mandatory fields.');
    }
  }
}
