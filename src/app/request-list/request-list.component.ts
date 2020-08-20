import { Component, OnInit } from '@angular/core';
import { RequestListService } from 'app/request-list/shared/request-list.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'evry-request-list',
  templateUrl: 'request-list.component.html',
  styleUrls: ['./shared/request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  Requests: any[] = [];


  constructor(private requestListService: RequestListService) {
  }

  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests() {
    this.requestListService.getRequests().subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          if (data.body.length > 0) {
            this.Requests = data.body;
            console.log('these are requests');
            console.log(this.Requests);

          }
        } else {
          //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
        }
      },
      err => {
        //// this.isGetting = false;
        if (err.status === 401) {
          console.log('error');
          // this.messageKey = 'landingPage.menu.login.invalidCredentials';
        }
      }
    );

  }

}
