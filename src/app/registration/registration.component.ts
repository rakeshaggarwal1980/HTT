import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'evry-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['./shared/registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  today: Date;

  constructor() {
  }

  ngOnInit() {
    this.today = new Date();
  }
}
