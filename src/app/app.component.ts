import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from 'vendor/angular';
import { Location } from '@angular/common';


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

  onLogOut() {
    localStorage.setItem('auth_token', '');
    this.router.navigate(['']);
  }
}
