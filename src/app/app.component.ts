import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UtilityService } from 'app/shared/services/utility.service';
import { HR_ACTIONS, SECURITY_ACTIONS, EMPLOYEE_ACTIONS, SUPERADMIN_ACTIONS } from 'app/app.enum';


@Component({
  selector: 'evry-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  userName: string = '';
  currentUrl: string = '';
  previousUrl: string = '';
  isSuperAdmin: boolean = false;
  constructor(private translate: TranslateService, private router: Router, private location: Location,
    private locationStrategy: LocationStrategy,
    private utilityService: UtilityService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    let user = localStorage.getItem('user');
    if (user == null && user == '') {
      this.userName = '';
    }
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.utilityService.setPreviousUrl(this.currentUrl);
      this.currentUrl = event.url;
    });

    this.utilityService.previousUrl$.subscribe(
      url => {
        if (url !== null && url !== undefined) {
          this.previousUrl = url.toString();
        }
      }
    );
    if (this.previousUrl == '') {
      window.history.forward();
    }
  }

  ngDoCheck() {
    let user = localStorage.getItem('user');
    if (user !== '' && user !== null)
      this.userName = this.getInitials(JSON.parse(user).name);
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
    if (localStorage.getItem('user') !== '' && localStorage.getItem('user') !== null) {
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
              case 4:
                if (Object.values(SUPERADMIN_ACTIONS).includes(Action)) {
                  isPermitted = true;
                }
                this.isSuperAdmin = true;
                break;
              default:
                isPermitted = false;
            }
          });
          return isPermitted;
        }
      }
    } else {
      return false;
    }
  }

  onLogOut() {
    localStorage.setItem('auth_token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['']);
  }

  getInitials(name): any {
    if (name) {
      var array = name.split(' ');
      switch (array.length) {
        case 1:
          return array[0].charAt(0).toUpperCase();
          break;
        default:
          return array[0].charAt(0).toUpperCase() + array[array.length - 1].charAt(0).toUpperCase();
      }
    }
    return false;
  }

}
