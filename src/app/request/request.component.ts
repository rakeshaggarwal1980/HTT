import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'app/request/shared/request.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatInput } from '@angular/material/input';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';

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

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  constructor(private requestService: RequestService, private spinnerService: SpinnerService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

  }


  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    if (datePickerType.toLowerCase() == 'fromdate') {
      this.request.fromDate = new Date(event.value);
    } else if (datePickerType.toLowerCase() == 'todate') {
      this.request.toDate = new Date(event.value);
    }
  }

  isControlValid(dateType: string) {
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
    debugger;
    if (requestForm.valid) {
      if (this.isControlValid('fromdate') && this.isControlValid('todate')) {

        this.isGetting = true;
        this.spinnerService.startLoading();
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
            this.isGetting = false;
            this.spinnerService.stopLoading();
            if (!isNullOrUndefined(data)) {
              if (isNullOrUndefined(data.body)) {
                this.snackBarService.showError(data.message);
              } else {
                this.snackBarService.showSuccess('Request has been submitted to the designated authority!');
                requestForm.resetForm();
                this.fromInput.value = '';
                this.toInput.value = '';
              }
            } else {
              this.isGetting = false;
              this.spinnerService.stopLoading();
              this.snackBarService.showError('Error');
            }
          },
          err => {
            if (err.status > 300) {
              console.log('error');
              this.isGetting = false;
              this.spinnerService.stopLoading();
              this.snackBarService.showError('Error');
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
