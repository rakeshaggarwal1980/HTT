import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ErrorService, SnackBarService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import { UserAccountService } from '../shared/user-account.service';


@Component({
  selector: 'evry-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  isGetting: boolean = false;
  changePassword: any = {
    password: '',
    confirmPassword: ''

  };


  constructor(private snackBarService: SnackBarService,
    private spinnerService: SpinnerService, private userAccountService: UserAccountService,
    private errorService: ErrorService) {
  }

  ngOnInit() {
  }

  onChangePassword(changePasswordForm: any) {
    if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors == null) {
      this.snackBarService.showError('Please enter mandatory fields.');
    } else if (!changePasswordForm.valid && changePasswordForm.controls.passwords.errors.passwordCheck == 'failed') {
      this.snackBarService.showError('Passwords do not match');
    }
    else if (changePasswordForm.valid) {
      this.spinnerService.startLoading();
      let user = JSON.parse(localStorage.getItem('user'));

      const resetPasswordModel = {
        password: changePasswordForm.value.passwords.password,
        confirmPassword: changePasswordForm.value.passwords.confirmPassword,
        email: user.email
      }
      this.userAccountService.changePassword(resetPasswordModel).subscribe(
        data => {
          this.spinnerService.stopLoading();
          if (!isNullOrUndefined(data)) {
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
          this.spinnerService.stopLoading();
          this.errorService.handleError(err);
        }
      );
    }
    else {

      this.snackBarService.showError('Please enter mandatory fields.');
    }
  }
  cancel(changePasswordForm) {
    changePasswordForm.resetForm();
  }
}
