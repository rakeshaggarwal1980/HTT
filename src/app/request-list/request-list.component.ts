import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewRequestDialogComponent } from './shared/view-request-dialog/view-request-dialog.component';
import { RequestListService } from 'app/request-list/shared/request-list.service';

@Component({
  selector: 'evry-request-list',
  templateUrl: 'request-list.component.html',
  styleUrls: ['./shared/request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  Requests: any[] = [];
  viewRequestDialogRef: MatDialogRef<ViewRequestDialogComponent> = null;

  constructor(public dialog: MatDialog, private requestListService: RequestListService, private router: Router) {
  }

  ngOnInit() {
    this.getAllRequests();
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');
  }

  getAllRequests() {
    this.requestListService.getRequests().subscribe(
      data => {
        if (!isNullOrUndefined(data)) {
          if (data.body.length > 0) {
            this.Requests = data.body;
            console.log('these are requests');
            console.log(this.Requests);

          }
        } else {
        }
      },
      err => {
        //// this.isGetting = false;
        if (err.status === 401) {
          console.log('error');
        }
      }
    );

  }

  viewRequest(request) {
    this.dialog.closeAll();
    this.viewRequestDialogRef = this.dialog.open(ViewRequestDialogComponent, {
      width: '800px',
      height: '518px',
      disableClose: false,
      panelClass: 'success-box',
      data: { request: request }
    });
    this.viewRequestDialogRef.afterClosed().subscribe(result => {
      if(result){
        // show success msg
        console.log("Request has been updated successfully");
      }     else{
        // show error msg
        console.log("Error occurred");
      }
      this.viewRequestDialogRef = null;
    });
  }

  

}
