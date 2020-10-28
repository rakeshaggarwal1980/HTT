import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'app/request/shared/request.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatInput } from '@angular/material/input';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import { EntityStatus } from '../app.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'evry-request',
  templateUrl: 'request.component.html',
  styleUrls: ['./shared/request.component.scss'],
})
export class RequestComponent implements OnInit {
  today: Date;
  isGetting: boolean = false;
  minDate: any;
  request: any = {
    id: 0, requestNumber: '', employeeCode: '',
    fromDate: '', toDate: '', isApproved: false, isDeclined: false,
    employeeId: 0,
    employee: {
      id: 0,
      name: '',
      email: '',
      employeeCode: 0,
      status: EntityStatus.Active,
      roles: [],
      currentResidentialAddress: '',
      permanentResidentialAddress: ''
    },
    hRComments: ''

  };

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  constructor(private requestService: RequestService, private router: Router, private spinnerService: SpinnerService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    this.request.employeeCode = user.employeeCode;
    this.request.employee.name = user.name;
    this.minDate = moment(new Date());
  }


  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    if (datePickerType.toLowerCase() == 'fromdate') {
      this.request.fromDate = new Date(event.value);
    } else if (datePickerType.toLowerCase() == 'todate') {
      let toDate = new Date(event.value);
      this.request.toDate = toDate;
    }
  }

  isControlValid(dateType: string) {
    debugger;
    let validField: any = { valid: true, message: '' };
    if (dateType.toLowerCase() == 'fromdate') {
      if (isNullOrUndefined(this.request.fromDate) || this.request.fromDate == '' || this.request.fromDate == 'Invalid date') {
        document.getElementById('fromDatePicker').classList.add('error-field-highlighter');
        validField.valid = false;
      } else {
        document.getElementById('fromDatePicker').classList.remove('error-field-highlighter');
        validField.valid = true;
      }
    }
    else if (dateType.toLowerCase() == 'todate') {
      debugger;
      if (isNullOrUndefined(this.request.toDate) || this.request.toDate == '' || this.request.toDate == 'Invalid date') {
        document.getElementById('toDatePicker').classList.add('error-field-highlighter');
        validField.valid = false;
      } else {
        if (new Date(this.request.toDate).getTime() > new Date(this.request.fromDate).getTime()) {
          document.getElementById('toDatePicker').classList.remove('error-field-highlighter');
          validField.valid = true;
        }
        else {
          document.getElementById('toDatePicker').classList.add('error-field-highlighter');
          validField.valid = false;
          validField.message = 'To Date should be greater than From Date'
        }
      }
    }
    return validField;
  }

  onRequestClick(requestForm: any) {
    if (this.isControlValid('fromdate').valid && this.isControlValid('todate').valid) {
      this.isGetting = true;
      this.spinnerService.startLoading();
      let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.request.requestNumber = random.toString();
      let user = JSON.parse(localStorage.getItem('user'));

      this.request.employee.employeeCode = this.request.employeeCode;

      this.request.fromDate = moment(this.request.fromDate).format();

      this.request.toDate = moment(this.request.toDate).format();
      let employee = {
        id: user.userId,
        name: user.name,
        email: user.email,
        employeeCode: user.employeeCode,
        status: EntityStatus.Active,
        roles: user.roles,
        currentResidentialAddress: user.CurrentResidentialAddress,
        permanentResidentialAddress: user.PermanentResidentialAddress
      };
      this.request.employeeId = user.userId;
      this.request.employee = employee;
      debugger;
      this.requestService.createRequest(this.request).subscribe(
        (data: any) => {
          this.isGetting = false;
          debugger;
          this.spinnerService.stopLoading();
          if (!isNullOrUndefined(data)) {
            if (isNullOrUndefined(data.body)) {
              this.snackBarService.showError(data.message);
            } else {
              this.snackBarService.showSuccess('Request has been submitted to the designated authority!');
              requestForm.resetForm();
              this.fromInput.value = '';
              this.toInput.value = '';
              this.router.navigate(['/myrequests']);
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
            this.snackBarService.showError(err.error.message);

          }
        }
      );
    } else {
      let responseFromDate = this.isControlValid('fromdate');
      let responseToDate = this.isControlValid('todate');
      if (responseFromDate.message == '' && responseToDate.message == '') {
        this.snackBarService.showError('Please select date for request.');
      } else {
        this.snackBarService.showError(responseToDate.message);
      }
    }
  }
}
