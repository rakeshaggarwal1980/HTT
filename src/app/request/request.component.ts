import { Component, OnInit } from '@angular/core';
import { RequestService } from 'app/request/shared/request.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';


@Component({
  selector: 'evry-request',
  templateUrl: 'request.component.html',
  styleUrls: ['./shared/request.component.scss'],
})
export class RequestComponent implements OnInit {
  today: Date;
  isGetting: boolean = false;
  request: any = {
    id: 0, requestNumber: '', employeeCode: '', fromDate: '', toDate: '', isApproved: false, isDeclined: false,
    employeeId: 0, employee: {
      id: 0,
      name: '',
      email: '',
      password: '',
      employeeCode: 0
    }
  };


  constructor(private requestService: RequestService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');

  }


  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    if (datePickerType.toLowerCase() == 'fromdate') {
      this.request.fromDate = new Date(event.value);
    } else if (datePickerType.toLowerCase() == 'todate') {
      this.request.toDate = new Date(event.value);
    }
  }

  isControlValid(dateType: string) {

    debugger;
    if (dateType.toLowerCase() == 'fromdate') {
      if (isNullOrUndefined(this.request.fromDate) || this.request.fromDate == '' || this.request.fromDate == 'Invalid date') {
        document.getElementById('fromDatePicker').classList.add('error-field-highlighter');
        return false;
      } else {
        document.getElementById('fromDatePicker').classList.remove('error-field-highlighter');
        return true;
      }
    }
    else if (dateType.toLowerCase() == 'todate') {
      if (isNullOrUndefined(this.request.toDate) || this.request.toDate == '' || this.request.toDate == 'Invalid date') {
        document.getElementById('toDatePicker').classList.add('error-field-highlighter');
        return false;
      } else {
        document.getElementById('toDatePicker').classList.remove('error-field-highlighter');
        return true;
      }
    }
  }

  onRequestClick(requestForm: any) {
    console.log('this is request');
    console.log(this.request);
    if (requestForm.valid) {
      if (this.isControlValid('fromdate') && this.isControlValid('todate')) {

        this.isGetting = true;
        let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        this.request.requestNumber = random.toString();
        let user = JSON.parse(localStorage.getItem('user'));
        this.request.employee.employeeCode = this.request.employeeCode;

        this.request.fromDate = moment(this.request.fromDate).format();
        
        this.request.toDate = moment(this.request.toDate).format();
        this.request.employeeId = user.userId;
        this.request.employee.id = user.userId;
        this.request.employee.email = user.email;
        this.request.employee.password = '123456';

        this.requestService.createRequest(this.request).subscribe(
          data => {
            console.log('this is request data response');
            console.log(data);
            this.isGetting = false;
            if (!isNullOrUndefined(data)) {
              // this.setLocalUserProfileData(data);
              //  this.dialog.closeAll();
              console.log('request data not null');
              //  this.navigateToURL();
              console.log(data);
              if (isNullOrUndefined(data.body)) {
                this.snackBarService.showError(data.message);
              } else {
                this.snackBarService.showSuccess('Request has been submitted to the designated authority!');
                requestForm.requestForm();
              }
            } else {
              this.isGetting = false;
              this.snackBarService.showError('Error');
              //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
            }
          },
          err => {
            //// this.isGetting = false;
            if (err.status === 401) {
              console.log('error');
              this.isGetting = false;
              this.snackBarService.showError('Error');
              // this.messageKey = 'landingPage.menu.login.invalidCredentials';
            }
          }
        );
      } else {
        this.snackBarService.showError('Please select date for request.');
      }

    }
    else {
      this.isControlValid('fromdate');
      this.isControlValid('todate');
      this.snackBarService.showError('Please enter mandatory fields.');
    }
  }
}
