import {
  Component, OnInit, NgZone, ChangeDetectorRef, ApplicationRef,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'evry-thank-you',
  templateUrl: 'thank-you.component.html',
  styleUrls: ['./shared/thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  target: string = '';

  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.target = this.activatedRoute.snapshot.params.target;
    if (this.target == '' || this.target == undefined || this.target == null) {
      this.router.navigate(['']);
    }
  }

}


