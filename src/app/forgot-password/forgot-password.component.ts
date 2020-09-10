import {
  Component, OnInit
} from '@angular/core';
import { ForgotPasswordService } from 'app/forgot-password/shared/forgot-password.service';
import { isNullOrUndefined } from 'util';
import { Router } from 'vendor/angular';
import * as moment from 'moment';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
  today: Date;
  isGetting: boolean = false;
  forgotPassword = { email: '' };
  valid: boolean = false;
  constructor(private forgotPasswordService: ForgotPasswordService, private route: ActivatedRoute,
    private router: Router, private snackBarService: SnackBarService) {
    this.routeEvent(this.router);
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e)
      }
    });
  }
  onSendClick(model: any) {
    if (model.valid) {
      this.isGetting = true;
      this.forgotPasswordService.forgotPassword(model.value.email).subscribe(
        data => {
          this.isGetting = false;

          if (!isNullOrUndefined(data)) {

            console.log(data);
            if (data.statusCode == 200) {
              console.log('valid user');
              this.router.navigate(['/thanks']);
            } else {
              this.snackBarService.showError('You are not a registered user.');
            }

          } else {
            this.isGetting = false;
            this.snackBarService.showError('You are not a registered user');
          }
        },
        err => {
          debugger;
          if (err.status > 300) {
            this.isGetting = false;
            this.snackBarService.showError('You are not a registered user');
          }
        });
    }
  }
}


