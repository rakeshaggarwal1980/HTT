import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'evry-covid-form',
  templateUrl: 'covid-form.component.html',
  styleUrls: ['./shared/covid-form.component.scss'],
})
export class CovidFormComponent implements OnInit {
  today: Date;

  constructor() {
  }

  ngOnInit() {
   // this.today = new Date();
  }
}
