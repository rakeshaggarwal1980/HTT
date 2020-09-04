import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from 'vendor/angular';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { UtilityService } from 'app/shared/services/utility.service';
import { HR_ACTIONS, SECURITY_ACTIONS, EMPLOYEE_ACTIONS } from 'app/app.enum';
import { UserDetailDialogComponent } from './user-list/shared/user-detail-dialog/user-detail-dialog.component';


@Component({
  selector: 'evry-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService, private router: Router, private location: Location,
    private utilityService: UtilityService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    console.log(this.location.path());
  }

  isAuthenticated(Action: any): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user) && user !== '') {
      if (!isNullOrUndefined(user.role)) {
        if (user.role.id == 1) {
          if (Object.values(HR_ACTIONS).includes(Action)) {
            return true;
          }
          else {
            return false;
          }
        }
        if (user.role.id == 2) {
          if (Object.values(SECURITY_ACTIONS).includes(Action)) {
            return true;
          }
          else {
            return false;
          }
        }
        if (user.role.id == 3) {
          if (Object.values(EMPLOYEE_ACTIONS).includes(Action)) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    }
  }

  onLogOut() {
    localStorage.setItem('auth_token', '');
    this.router.navigate(['']);
  }
}
