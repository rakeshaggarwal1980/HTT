import {
  Component, OnInit, NgZone, ChangeDetectorRef, ApplicationRef,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'evry-thank-you',
  templateUrl: 'thank-you.component.html',
  styleUrls: ['./shared/thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
    ;
  constructor() {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }

}


