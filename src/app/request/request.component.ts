import { Component, OnInit } from '@angular/core';
import { RequestService } from 'app/request/shared/request.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';


@Component({
  selector: 'evry-request',
  templateUrl: 'request.component.html',
  styleUrls: ['./shared/request.component.scss'],
})
export class RequestComponent implements OnInit {
  today: Date;
  request: any = {
    id: 0, requestNumber: '', employeeCode: 0, dateOfRequest: '', isApproved: false, isDeclined: false,
    employeeId: 0, employee: {
      id: 0,
      name: '',
      email: '',
      password: '',
      employeeCode: 0
    }
  };


  constructor(private requestService: RequestService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.request.dateOfRequest = new Date(event.value);

  }

  dateChanged(evt){
    let selectedDate = new Date(evt);
    console.log("by default:", moment(selectedDate,"YYYY-MM-DDTHH:mm:ss:msZ"));
    console.log("by UTCString:", moment(selectedDate).format("YYYY-MM-DDTHH:mm:ss:msZ"));
    console.log("by LocaleString:", selectedDate.toLocaleString());
    console.log("by LocaleTimeString:", selectedDate.toLocaleTimeString());
  }

  onRequestClick() {
    console.log('this is request');
    console.log(this.request);

    //this.isGetting = true;\
    let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.request.requestNumber = random.toString();
    let user = JSON.parse(localStorage.getItem('user'));
    this.request.employee.employeeCode = this.request.employeeCode;

    this.request.dateOfRequest =moment(this.request.dateOfRequest).format();
    this.request.employeeId = user.userId;
    this.request.employee.id = user.userId;
    this.request.employee.email = user.email;
    this.request.employee.password = '123456';

    this.requestService.createRequest(this.request).subscribe(
      data => {
        console.log('this is request data response');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          console.log('request data not null');
          //  this.navigateToURL();
          console.log(data);
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
