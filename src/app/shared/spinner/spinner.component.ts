import { Component, ElementRef, Input, Inject, OnInit } from '@angular/core';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import { Subscription } from "rxjs";

@Component({
    selector: 'evry-spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['./shared/spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    loading: boolean = false;;
    spinnerSubscription: Subscription;

    constructor(private element: ElementRef, private spinnerService: SpinnerService) { }

    ngOnInit() {
        this.spinnerSubscription = this.spinnerService.loadingStatus.subscribe((value: any) => {
            this.loading = value;
        });
    }

    ngOnDestroy() {
        this.spinnerSubscription.unsubscribe();
    }
}