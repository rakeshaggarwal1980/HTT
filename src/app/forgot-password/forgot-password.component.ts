import {
  Component, OnInit
} from '@angular/core';
import { ForgotPasswordService } from 'app/forgot-password/shared/forgot-password.service';
import { isNullOrUndefined } from 'util';
import { Router } from 'vendor/angular';
import * as moment from 'moment';
import { ErrorService, SnackBarService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Subscription';
import { ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'evry-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['./shared/forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isGetting: boolean = false;
  forgotPassword = { email: '' };
  valid: boolean = false;
  submitted = false;
  constructor(private forgotPasswordService: ForgotPasswordService, private errorService: ErrorService,
    private router: Router, private snackBarService: SnackBarService, private spinnerService: SpinnerService) {

  }

  ngOnInit() {
    debugger;
    localStorage.setItem('auth_token', '');
    localStorage.setItem('user', '');
  }

  onSendClick(model: any) {
    if (model.valid) {
      this.isGetting = true;
      this.spinnerService.startLoading();
      this.forgotPasswordService.forgotPassword(model.value.email).subscribe(
        data => {
          debugger;
          this.isGetting = false;
          this.spinnerService.stopLoading();
          if (!isNullOrUndefined(data)) {
            if (data.statusCode === 200) {
              this.router.navigate(['/thanks/fgt']);
            } else {
              this.snackBarService.showError('You are not a registered user.');
            }

          } else {
            this.isGetting = false;
            this.spinnerService.stopLoading();
            this.snackBarService.showError('You are not a registered user');
          }
        },
        err => {

          this.isGetting = false;
          this.spinnerService.stopLoading();
          this.errorService.handleError(err);

        });
    }
    this.submitted = true;
  }
}


