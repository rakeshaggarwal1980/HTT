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
  userName: string = '';
  constructor(private translate: TranslateService, private router: Router, private location: Location,
    private utilityService: UtilityService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    console.log(this.location.path());
    let user = JSON.parse(localStorage.getItem('user'));
    this.userName = user.name;
  }

  openMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
  }


  // window.onclick = function(event) {
  //   if (!event.target.matches('.dropbtn')) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains('show')) {
  //         openDropdown.classList.remove('show');
  //       }
  //     }
  //   }
  // }

  isAuthenticated(Action: any): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    let isPermitted: boolean = false;
    if (!isNullOrUndefined(user) && user !== '') {
      if (!isNullOrUndefined(user.roles)) {
        user.roles.forEach(role => {
          switch (role.roleId) {
            case 1:
              if (Object.values(HR_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 2:
              if (Object.values(SECURITY_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 3:
              if (Object.values(EMPLOYEE_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            default:
              isPermitted = false;
          }
        });
        return isPermitted;
      }
    }
  }

  onLogOut() {
    localStorage.setItem('auth_token', '');
    this.router.navigate(['']);
  }
}
