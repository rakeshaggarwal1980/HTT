import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'evry-request-list',
  templateUrl: 'request-list.component.html',
  styleUrls: ['./shared/request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  today: Date;

  constructor() {
  }

  ngOnInit() {
   // this.today = new Date();
  }
}
