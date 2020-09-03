import { Component, OnInit, Input } from '@angular/core';
import { DeclarationService } from 'app/declaration-form/shared/declaration.service';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { EntityStatus } from 'app/app.enum';
import { Router, ActivatedRoute, Validators } from 'vendor/angular';
import { SnackBarService, ValidatorService, ErrorService } from 'app/shared/index.shared';


@Component({
  selector: 'evry-declaration-form',
  templateUrl: 'declaration-form.component.html',
  styleUrls: ['./shared/declaration-form.component.scss'],
})
export class DeclarationFormComponent implements OnInit {
  requestNumber: any;
  employeeId: number;
  viewMode: boolean = false;
  symptoms: any[] = [];
  zones: any[] = [];
  questions: any[] = [];
  locations: any[] = [];
  declarationForm: FormGroup;
  healthTrackSymptoms: FormArray;
  healthTrackQuestionAnswers: FormArray;
  alphabet = 'abcdefghijklmnopqrstuvwxyz';
  submitted: boolean = false;
  isLocationValid: boolean = false;
  isZoneValid: boolean = false;
  isPreExistHealthIssueValid: boolean = false;
  isContactWithCovidPeopleValid: boolean = false;
  isTravelOustSideInLast15DaysValid: boolean = false;
  isConfirmInfoValid: boolean = false;

  request: any =
    {
      id: 0,
      residentialAddress: '',
      preExistHealthIssue: false,
      contactWithCovidPeople: false,
      travelOustSideInLast15Days: false,
      dateOfTravel: '2020-08-26T16:52:27.118Z',
      locationId: 0,
      zoneId: 0,
      employeeId: 0,
      healthTrackSymptoms: [
        {
          id: 0,
          healthTrackId: 0,
          symptomId: 0,
          name: '',
          value: true
        }
      ],
      healthTrackQuestionAnswers: [
        {
          id: 0,
          healthTrackId: 0,
          questionId: 0,
          question: '',
          value: true
        }
      ],
      status: 0,
      requestNumber: ''
    };

  constructor(private declarationService: DeclarationService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.generateForm();
    console.log('reques no');
    this.requestNumber = this.activatedRoute.snapshot.params.requestNumber;
    this.employeeId = this.activatedRoute.snapshot.params.employeeId;
    if (!isNullOrUndefined(this.employeeId)) {
      this.viewMode = true;
      this.getEmployeeSelfDeclaration(this.employeeId, this.requestNumber);
    } else {
      this.viewMode = false;
    }
    this.getDeclarationFormData();
  }

  private generateForm() {
    this.declarationForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      residentialAddress: ['', Validators.required],
      preExistHealthIssue: [''],
      contactWithCovidPeople: [''],
      travelOustSideInLast15Days: [''],
      dateOfTravel: [new Date()],
      locationId: [''],
      zoneId: [''],
      employeeId: ['', Validators.required],
      healthTrackSymptoms: this.fb.array([this.fb.group({
        id: [0],
        healthTrackId: [0],
        symptomId: [0],
        name: [''],
        type: [''],
        value: ['', Validators.required]
      })]),
      healthTrackQuestionAnswers: this.fb.array([this.fb.group({
        id: [0],
        healthTrackId: [0],
        questionId: [0],
        question: [''],
        type: [''],
        value: ['', Validators.required]
      })]),
      status: [0],
      requestNumber: [''],
      confirmation: ['']
    });
  }

  isControlInValid(control: string) {
    return this.submitted && !this.declarationForm.controls[control].valid;
  }

  private patchSymptomsInfo(symptoms: any) {
    if (symptoms && symptoms.length > 0) {
      this.healthSymptoms.patchValue(symptoms);
      if (symptoms.length > 1) {
        for (let i = 1; i < symptoms.length; i++) {
          const c = symptoms[i];
          this.healthSymptoms.push(this.fb.group({
            id: [c.id],
            healthTrackId: [c.healthTrackId],
            symptomId: [c.symptomId],
            name: [c.name],
            type: [c.type],
            value: [c.value]
          }));
        }
      }
    }
  }


  private patchHealthTrackerQuestions(questions: any) {
    if (questions && questions.length > 0) {
      //  this.healthTrackSymptoms = this.declarationForm.get('healthTrackSymptoms') as FormArray;
      this.healthTrackerQuestions.patchValue(questions);
      ////this.updateRate(selectedParts[0].subQuipRate, 'subquip', 0);
      //   this.updateRate(selectedParts[0].rentalPerDay, 'rental', 0);
      if (questions.length > 1) {
        for (let i = 1; i < questions.length; i++) {
          const c = questions[i];
          this.healthTrackerQuestions.push(this.fb.group({
            id: [c.id],
            healthTrackId: [c.healthTrackId],
            questionId: [c.questionId],
            question: [c.question],
            type: [c.type],
            value: ([c.value])
          }));
        }
      }
    }
    console.log(this.healthTrackerQuestions);
  }


  getDeclarationFormData() {
    this.declarationService.getDeclarationData().subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          if (!isNullOrUndefined(data.body)) {
            if (data.body.symptoms.length > 0) {
              let healthTrackSymptoms = [];

              data.body.symptoms.forEach(element => {

                healthTrackSymptoms.push({
                  id: 0,
                  healthTrackId: 0,
                  symptomId: element.id,
                  name: element.name,
                  type: element.type,
                  value: ''
                });
              });
              if (this.viewMode == true) {
                this.symptoms.forEach(element => {

                  let index = healthTrackSymptoms.findIndex(s => s.symptomId == element.symptomId);

                  console.log('index of symptom' + index);
                  healthTrackSymptoms[index].value = element.value;
                  healthTrackSymptoms[index].healthTrackId = element.healthTrackId;
                  healthTrackSymptoms[index].id = element.id;
                });
              }
              console.log('all sysmptoms to be patched');
              console.log(healthTrackSymptoms);
              this.patchSymptomsInfo(healthTrackSymptoms);

              //  this.symptoms = data.body.symptoms;
            }
            if (data.body.locations.length > 0) {
              this.locations = data.body.locations;



            }
            if (data.body.questions.length > 0) {

              let healthTrackerQuestions = [];

              data.body.questions.forEach(element => {
                healthTrackerQuestions.push({
                  id: 0,
                  healthTrackId: 0,
                  questionId: element.id,
                  question: element.name,
                  type: element.type,
                  value: ''
                });
              });
              if (this.viewMode == true) {
                this.questions.forEach(element => {
                  let index = healthTrackerQuestions.findIndex(q => q.questionId == element.questionId);
                  console.log('index of symptom' + index);
                  healthTrackerQuestions[index].value = element.value;
                  healthTrackerQuestions[index].healthTrackId = element.healthTrackId;
                  healthTrackerQuestions[index].id = element.id;
                });
              }
              console.log('all questions to be patched');
              console.log(healthTrackerQuestions);
              this.patchHealthTrackerQuestions(healthTrackerQuestions);
              // this.questions = data.body.questions;
            }
            if (data.body.zones.length > 0) {
              this.zones = data.body.zones;
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

  getEmployeeSelfDeclaration(employeeId: number, requestNumber: string) {
    this.declarationService.getEmployeeSelfDeclaration(employeeId, requestNumber).subscribe(
      data => {
        console.log('this is data');
        console.log(data);
        //  this.isGetting = false;
        if (!isNullOrUndefined(data)) {
          // this.setLocalUserProfileData(data);
          //  this.dialog.closeAll();
          if (!isNullOrUndefined(data.body)) {
            this.declarationForm.patchValue({
              id: 0,
              name: data.body.employee.name,
              residentialAddress: data.body.residentialAddress,
              preExistHealthIssue: data.body.preExistHealthIssue,
              contactWithCovidPeople: data.body.contactWithCovidPeople,
              travelOustSideInLast15Days: data.body.travelOustSideInLast15Days,
              dateOfTravel: data.body.dateOfTravel,
              locationId: data.body.locationId,
              zoneId: data.body.zoneId,
              employeeId: data.body.employeeId,
              status: data.body.status,
              requestNumber: data.body.requestNumber
            });
            this.symptoms = data.body.healthTrackSymptoms;
            this.questions = data.body.healthTrackQuestionAnswers;

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
    console.log(this.declarationForm);
  }

  get healthSymptoms(): FormArray {
    // console.log('getting the test array', this.declarationForm.get('healthTrackSymptoms'));
    return this.declarationForm.get('healthTrackSymptoms') as FormArray;
  }

  get healthTrackerQuestions(): FormArray {
    //console.log('getting the test array', this.declarationForm.get('healthTrackQuestionAnswers'));
    return this.declarationForm.get('healthTrackQuestionAnswers') as FormArray;
  }

  onDeclarationClick(formData: any) {
    this.submitted = true;
    if (formData.valid) {
      if (!this.isLocationValid || !this.isZoneValid || !this.isPreExistHealthIssueValid || !this.isContactWithCovidPeopleValid || !this.isTravelOustSideInLast15DaysValid || !this.isConfirmInfoValid) {
        this.snackBarService.showError("Please enter or select mandatory fields.");
      } else {
        let user = JSON.parse(localStorage.getItem('user'));
        console.log('this is declaration form');
        console.log(this.declarationForm);
        console.log('data to be sent');
        this.request.id = 0;
        this.request.residentialAddress = formData.value.residentialAddress;
        this.request.dateOfTravel = new Date();
        this.request.employeeId = user.userId;
        this.request.healthTrackSymptoms = [];
        if (formData.value.healthTrackSymptoms.length > 0) {
          formData.value.healthTrackSymptoms.forEach(element => {
            this.request.healthTrackSymptoms.push({
              id: element.id,
              healthTrackId: element.healthTrackId,
              symptomId: element.symptomId,
              name: element.name,
              value: element.value
            })
          });
        }
        this.request.healthTrackQuestionAnswers = [];
        if (formData.value.healthTrackQuestionAnswers.length > 0) {
          formData.value.healthTrackQuestionAnswers.forEach(element => {
            this.request.healthTrackQuestionAnswers.push({
              id: element.id,
              healthTrackId: element.healthTrackId,
              questionId: element.questionId,
              question: element.question,
              value: String(element.value)
            })
          });
        }


        this.request.status = EntityStatus.Active;
        this.request.requestNumber = this.requestNumber;
        console.log(this.request);
        this.declarationService.PostDeclarationData(this.request).subscribe(
          data => {
            console.log('this is declaration data response');
            console.log(data);
            //  this.isGetting = false;
            if (!isNullOrUndefined(data)) {
              console.log('declaration data not null');
              console.log(data);
              if (isNullOrUndefined(data.body)) {
                this.snackBarService.showError(data.message);
              } else {
                this.snackBarService.showSuccess('Declaration submitted successfully!!');

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
    else {
      this.snackBarService.showError("Please enter or select mandatory fields.");
    }
  }

  onChange(categoryName: any, index: any, value: any) {
    switch (categoryName) {
      case 'location':
        this.request.locationId = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isLocationValid = true;
        } else {
          this.isLocationValid = false;
        }
        break;
      case 'zone':
        this.request.zoneId = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isZoneValid = true;
        } else {
          this.isZoneValid = false;
        }
        break;
      case 'preExistHealthIssue':
        this.request.preExistHealthIssue = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isPreExistHealthIssueValid = true;
        } else {
          this.isPreExistHealthIssueValid = false;
        }
        break;
      case 'contactWithCovidPeople':
        this.request.contactWithCovidPeople = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isContactWithCovidPeopleValid = true;
        } else {
          this.isContactWithCovidPeopleValid = false;
        }
        break;
      case 'travelOustSideInLast15Days':
        this.request.travelOustSideInLast15Days = value;
        if (!isNullOrUndefined(value) && value !== '') {
          this.isTravelOustSideInLast15DaysValid = true;
        } else {
          this.isTravelOustSideInLast15DaysValid = false;
        }
        break;
      case 'healthTrackSymptoms':
        this.healthTrackSymptoms = this.declarationForm.get('healthTrackSymptoms') as FormArray;
        console.log(this.healthTrackSymptoms.at(index));
        this.healthTrackSymptoms.at(index).patchValue({ value: value })
        //this.healthTrackSymptoms.sp({ value });
        console.log(this.healthTrackSymptoms);
        console.log('changed from');
        console.log(this.declarationForm);
        break;
      case 'healthTrackQuestionAnswers':
        this.healthTrackQuestionAnswers = this.declarationForm.get('healthTrackQuestionAnswers') as FormArray;
        console.log(this.healthTrackQuestionAnswers.at(index));
        // let data = this.healthTrackSymptoms.at(index);
        // data.
        this.healthTrackQuestionAnswers.at(index).patchValue({ value: value })
        //this.healthTrackSymptoms.sp({ value });
        console.log(this.healthTrackQuestionAnswers);
        console.log('changed from');
        console.log(this.declarationForm);
        break;
      case 'confirm':
        if (!isNullOrUndefined(value) && value !== '') {
          this.isConfirmInfoValid = true;
        } else {
          this.isConfirmInfoValid = false;
        }
        break;
      default:
        console.log(this.declarationForm);
        break;

    }

  }
}
