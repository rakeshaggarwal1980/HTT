import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from 'vendor/angular';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { ACTIONS } from 'app/app.enum';


@Component({
  selector: 'evry-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService, private router: Router, private location: Location) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    console.log(this.location.path());
  }

  isAuthenticated(ACTION: any) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user) && user !== '') {
      if (user.roleId == 1) {
        
      }
    }

  }
  onLogOut() {
    localStorage.setItem('auth_token', '');
    this.router.navigate(['']);
  }
}
