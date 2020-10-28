import { Component, OnInit, Input } from '@angular/core';
import { CovidFormService } from 'app/covid-form/shared/covid-form.service';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { EntityStatus } from 'app/app.enum';
import { EMPLOYEE_ACTIONS, HR_ACTIONS, SECURITY_ACTIONS } from 'app/app.enum';
import { Router, ActivatedRoute, Validators } from 'vendor/angular';
import { SnackBarService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
  selector: 'evry-covid-form',
  templateUrl: 'covid-form.component.html',
  styleUrls: ['./shared/covid-form.component.scss'],
})
export class CovidFormComponent implements OnInit {
  requestNumber: any;
  employeeId: number;
  declarationId: number;
  isSuperAdmin: boolean = false;
  isGetting: boolean = false;
  viewMode: boolean = false;
  symptoms: any[] = [];
  zones: any[] = [];
  questions: any[] = [];
  locations: any[] = [];
  previousUrl: string = '';
  currentDate = new Date();
  covidForm: FormGroup;
  submissionDate: string;
  healthTrackSymptoms: FormArray;
  healthTrackQuestionAnswers: FormArray;
  alphabet = 'abcdefghijklmnopqrstuvwxyz';
  submitted: boolean = false;
  currentResidentialAddress: string = '';
  isLocationValid: boolean = false;
  othersInfected: boolean = false;
  hospitalizationNeed: boolean = false;
  isConfirmInfoValid: boolean = false;
  name: string = '';
  employeeCode: number = 0;
  user: any;
  request: any =
    {
      id: 0,
      employeeId: 0,
      locationId: 0,
      dateOfSymptoms: '2020-08-26T16:52:27.118Z',
      officeLastDay: '2020-08-26T16:52:27.118Z',
      covidConfirmationDate: '2020-08-26T16:52:27.118Z',
      othersInfectedInFamily: false,
      familyMembersCount: 0,
      hospitalizationNeed: false,
      status: 0
    };

  constructor(private covidFormService: CovidFormService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService, private spinnerService: SpinnerService, private utilityService: UtilityService) {
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user) && user !== '') {
      this.name = user.name;
      this.employeeCode = user.employeeCode;
      this.currentResidentialAddress = user.currentResidentialAddress;
      this.user = user;
    }
    this.generateForm();
    console.log('reques no');
    this.declarationId = this.activatedRoute.snapshot.params.declarationId;
    if (!isNullOrUndefined(this.declarationId)) {
      this.viewMode = true;
      this.getEmployeeCovidDeclaration(this.declarationId);
    } else {
      this.viewMode = false;
    }
    this.getCovidFormData();

  }

  private generateForm() {
    this.covidForm = this.fb.group({
      id: [0],
      name: [this.name],
      covidConfirmationDate: [new Date()],
      officeLastDay: [new Date()],
      dateOfSymptoms: [new Date()],
      locationId: [''],
      employeeId: [this.employeeCode],
      othersInfectedInFamily: [''],
      familyMembersCount: [''],
      hospitalizationNeed: [''],
      status: [0],
      confirmation: ['']
    });
  }

  getEmployeeCovidDeclaration(declarationId: number) {
    this.covidFormService.getCovidDeclaration(declarationId).subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          if (!isNullOrUndefined(data.body)) {
            data.body = data.body[0];
            this.covidForm.patchValue({
              id: 0,
              name: data.body.employee.name,
              locationId: data.body.locationId,
              covidConfirmationDate: data.body.covidConfirmationDate,
              officeLastDay: data.body.officeLastDay,
              dateOfSymptoms: data.body.dateOfSymptoms,
              employeeId: data.body.employeeId,
              othersInfectedInFamily: data.body.othersInfectedInFamily,
              familyMembersCount: data.body.familyMembersCount,
              hospitalizationNeed: data.body.hospitalizationNeed,
              status: data.body.status,
            });
            this.request.officeLastDay = data.body.officeLastDay;
            this.request.dateOfSymptoms = data.body.dateOfSymptoms;
            this.request.covidConfirmationDate = data.body.covidConfirmationDate;
            this.request.othersInfectedInFamily = data.body.othersInfectedInFamily;
            this.request.familyMembersCount = data.body.familyMembersCount;
            this.request.hospitalizationNeed = data.body.hospitalizationNeed;
            this.submissionDate = moment(data.body.createdDate).format();
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
    console.log('this is view mode');
    console.log(this.covidForm);
  }

  isControlInValid(control: string) {
    return this.submitted && !this.covidForm.controls[control].valid;
  }

  goBack() {
    this.utilityService.previousUrl$.subscribe(url => {
      this.previousUrl = url.toString();
    });
    if (this.previousUrl !== '') {
      this.router.navigate([this.previousUrl]);
    }
  }

  getCovidFormData() {
    this.covidFormService.getDeclarationData().subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          if (!isNullOrUndefined(data.body)) {

            if (data.body.locations.length > 0) {
              this.locations = data.body.locations;

            }

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

  isAuthenticated(Action: any): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    let isPermitted: boolean = false;
    if (!isNullOrUndefined(user) && user !== '') {
      if (!isNullOrUndefined(user.roles)) {
        user.roles.forEach(role => {
          switch (role.roleId) {
            case 1:
              if (Object.values(HR_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 2:
              if (Object.values(SECURITY_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 3:
              if (Object.values(EMPLOYEE_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 4:
              this.isSuperAdmin = true;
              isPermitted = true;
              break;
            default:
              isPermitted = false;
          }
        });
        return isPermitted;
      }
    }
  }

  // getEmployeeSelfDeclaration(employeeId: number, requestNumber: string) {
  //   this.covidFormService.getEmployeeSelfDeclaration(employeeId, requestNumber).subscribe(
  //     data => {
  //       console.log('this is data');
  //       console.log(data);
  //       //  this.isGetting = false;
  //       if (!isNullOrUndefined(data)) {
  //         // this.setLocalUserProfileData(data);
  //         //  this.dialog.closeAll();
  //         if (!isNullOrUndefined(data.body)) {
  //           data.body = data.body[0];
  //           this.covidForm.patchValue({
  //             id: 0,
  //             name: data.body.employee.name,
  //             locationId: data.body.locationId,
  //             zoneId: data.body.zoneId,
  //             employeeId: data.body.employeeId,
  //             status: data.body.status,
  //             requestNumber: data.body.requestNumber
  //           });
  //           this.symptoms = data.body.healthTrackSymptoms;
  //           this.questions = data.body.healthTrackQuestionAnswers;

  //         }
  //       } else {
  //         //  this.messageKey = 'landingPage.menu.login.invalidCredentials';
  //       }
  //     },
  //     err => {
  //       //// this.isGetting = false;
  //       if (err.status === 401) {
  //         console.log('error');
  //         // this.messageKey = 'landingPage.menu.login.invalidCredentials';
  //       }
  //     }
  //   );
  //   console.log('this is view mode');
  //   console.log(this.declarationForm);
  // }

  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    if (datePickerType.toLowerCase() == 'officedaydate') {
      this.request.officeLastDay = new Date(event.value);
    } else if (datePickerType.toLowerCase() == 'symptomsdate') {
      this.request.dateOfSymptoms = new Date(event.value);
    } else if (datePickerType.toLowerCase() == 'confirmationdate') {
      this.request.covidConfirmationDate = new Date(event.value);
    }
  }

  onDeclarationClick(formData: any) {
    debugger;
    this.submitted = true;
    if (formData.valid) {
      if (!this.isLocationValid || !this.othersInfected || !this.hospitalizationNeed) {
        this.snackBarService.showError("Please enter or select mandatory fields.");
      }
      else if (!this.isConfirmInfoValid) {
        this.snackBarService.showError("Please confirm the information filled.");
      }
      else {
        this.spinnerService.startLoading();
        window.scroll(0, 0);
        let user = JSON.parse(localStorage.getItem('user'));
        this.isGetting = true;
        this.request.id = 0;
        if (formData.value.familyMembersCount == '') {
          this.request.familyMembersCount = 0;
        } else {
          this.request.familyMembersCount = parseInt(formData.value.familyMembersCount);
        }
        //  this.locationId: 0,
        this.request.dateOfSymptoms = moment(this.request.dateOfSymptoms).format();
        this.request.officeLastDay = moment(this.request.officeLastDay).format();
        this.request.covidConfirmationDate = moment(this.request.covidConfirmationDate).format();
        this.request.employeeId = user.userId;
        this.request.status = EntityStatus.Active;
        console.log(this.request);
        this.covidFormService.PostCovidDeclarationData(this.request).subscribe(
          data => {
            console.log('this is declaration data response');
            console.log(data);
            this.spinnerService.stopLoading();
            if (!isNullOrUndefined(data)) {
              console.log('declaration data not null');
              console.log(data);
              if (isNullOrUndefined(data.body)) {
                this.snackBarService.showError(data.message);
              } else {
                // this.snackBarService.showSuccess('Declaration submitted successfully!!');
                this.router.navigate(['thanks/covid']);
              }
            } else {
              this.spinnerService.stopLoading();
              console.log(data);
              this.snackBarService.showError('Error');
            }
          },
          err => {

            console.log(err);
            if (err.status > 300) {
              this.spinnerService.stopLoading();
              this.snackBarService.showError(err.error.message);
              // this.messageKey = 'landingPage.menu.login.invalidCredentials';
            }
          }
        );
      }
    }
    else {
      this.snackBarService.showError("Please enter or select mandatory fields.");
    }
  }

  onChange(categoryName: any, index: any, value: any) {
    debugger;
    switch (categoryName.toLowerCase()) {
      case 'location':
        this.request.locationId = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isLocationValid = true;
        } else {
          this.isLocationValid = false;
        }
        break;
      case 'othersinfectedinfamily':
        this.request.othersInfectedInFamily = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.othersInfected = true;
        } else {
          this.othersInfected = false;
        }
        break;
      case 'hospitalizationneed':
        this.request.hospitalizationNeed = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.hospitalizationNeed = true;
        } else {
          this.hospitalizationNeed = false;
        }
        break;
      case 'confirm':
        if (!isNullOrUndefined(value) && value !== '') {
          this.isConfirmInfoValid = value.currentTarget.checked;
        } else {
          this.isConfirmInfoValid = false;
        }
        break;
      default:
        console.log(this.covidForm);
        break;

    }

  }
}
