import {
  Component, OnInit, Inject, NgZone, ChangeDetectorRef, ApplicationRef,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SORT_DIRECTION } from 'app/app.enum';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Subscription';
import { ExportService } from 'app/shared/services/export.service';
import { DeclarationListService } from 'app/declaration-list/shared/declaration-list.service';
import { SnackBarService } from 'app/shared/index.shared';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';


@Component({
  selector: 'evry-declaration-list',
  templateUrl: 'declaration-list.component.html',
  styleUrls: ['./shared/declaration-list.component.scss'],
})
export class DeclarationListComponent implements OnInit, AfterViewInit {
  declarations: any[] = [];
  userId: number = 0;
  errorDate: boolean = false;
  errorInput: boolean = false;
  searchInput = '';
  propertyName = '';
  submissionDate: any;
  keyupSub: Subscription;
  @ViewChild('search') inputElRef: ElementRef;
  toppings = new FormControl();
  categories: any[] = [{ id: 'employeeid', value: 'Employee Id' }, { id: 'employeename', value: 'Employee Name' }, { id: 'date', value: 'Declaration Date' }];
  pageInfo: any = {
    CurrentPage: 1, PageSize: 10, TotalCount: 0, TotalPages: 0
  };
  pageNumber = 1;
  sortColumn = '';
  sortDirection = SORT_DIRECTION.DESC;
  sortDirectionStatus = {
    id: SORT_DIRECTION.DESC,
    employeename: SORT_DIRECTION.DESC,
    createdDate: SORT_DIRECTION.DESC
  };
  sortDirectionStatuskeys = Object.keys(this.sortDirectionStatus);
  declarationsToExport: any = [];
  constructor(public dialog: MatDialog, private declarationListService: DeclarationListService,
    private router: Router, private ngzone: NgZone, private cdref: ChangeDetectorRef,
    private appref: ApplicationRef, private snackBarService: SnackBarService,
    private exportService: ExportService) {
  }

  ngAfterViewInit() {
    this.ngzone.runOutsideAngular(() => {
      // debounce keystroke events
      this.keyupSub = Observable.fromEvent(this.inputElRef.nativeElement, 'keyup')
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          this.searchInput = keyboardEvent.target.value;
          this.cdref.detectChanges();
        });
    });
  }
  // ngDoCheck() { console.log('cd'); }
  ngOnDestroy() {
    this.keyupSub.unsubscribe();
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!isNullOrUndefined(user) && user !== '') {
      this.userId = user.userId;
    }
    this.getAllDeclarations();
    // for (let i = 0; i <= 25; i++) {
    //   this.customers.push({
    //     firstName: `first${i}`, lastName: `last${i}`,
    //     email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`
    //   });
    // }

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');
  }


  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    this.submissionDate = new Date(event.value);
  }

  onSortClick(column) {
    this.sortColumn = column;
    this.setSortDirectionStatus(column);
  }

  setSortDirectionStatus(propName) {
    this.sortDirectionStatuskeys.forEach((val) => {
      if (val === propName) {
        this.sortDirectionStatus[val] = (this.sortDirectionStatus[val] === SORT_DIRECTION.ASC) ?
          SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
        this.sortDirection = this.sortDirectionStatus[val];
        this.getAllDeclarations();
      } else {
        this.sortDirectionStatus[val] = SORT_DIRECTION.ASC;
      }
    });
  }

  onSearch(searchCategory: any) {
    if (this.propertyName.toLowerCase() == 'date' && !isNullOrUndefined(this.submissionDate) && this.submissionDate !== '') {
      this.getAllDeclarations();
    } else if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename')
      && !isNullOrUndefined(this.searchInput) && this.searchInput !== '') {
      this.getAllDeclarations();
    } else {
      if (this.propertyName.toLowerCase() == 'date' && isNullOrUndefined(this.submissionDate) && this.submissionDate == '') {
        this.errorDate = true;
        this.errorInput = false;
      } if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename') && isNullOrUndefined(this.searchInput) && this.searchInput == '') {
        this.errorDate = false;
        this.errorInput = true;
      }
    }



  }
  onExport() {
    this.getDeclarationsToExport();


  }
  getAllDeclarations() {

    if (this.userId !== 0 && !isNullOrUndefined(this.userId)) {
      let searchSortModel = {
        propertyName: this.propertyName,
        searchString: this.propertyName.toLowerCase() !== 'date' ? this.searchInput : this.submissionDate,
        sortColumn: this.sortColumn,
        sortDirection: this.sortDirection,
        page: 1,
        pageSize: 10,
        totalRecords: 0,
        SearchResult: {}
      };
      console.log('search Model');
      console.log(searchSortModel);

      this.declarationListService.getDeclarations(searchSortModel).subscribe(
        data => {
          debugger;
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {
              this.declarations = data.body.searchResult;
              this.setPagingInfoFromResponse(data.body);
              console.log('these are declarations');
              console.log(data.body.searchResult);

            }
            else {
              this.declarations = [];
              this.snackBarService.showError('No declaration found.');
            }
          } else {
            this.declarations = [];
            this.snackBarService.showError('No declaration found.');
          }
        },
        err => {
          //// this.isGetting = false;
          if (err.status >= 300) {
            this.declarations = [];
            this.snackBarService.showError('No declaration found.');

          }

        }
      );
    }

  }

  getDeclarationsToExport() {
    if (this.userId !== 0 && !isNullOrUndefined(this.userId)) {
      this.declarationListService.getDeclarationToExport().subscribe(
        data => {
          debugger;
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {
              console.log('dec');
              console.log(data.body);
              let arrdeclarationsToExport = [];
              data.body.forEach((element: any, index) => {
                debugger;
                arrdeclarationsToExport.push(
                  {

                    Id: element.id,
                    locationId: element.locationId,
                    preExistHealthIssue: element.preExistHealthIssue,
                    requestNumber: element.requestNumber,
                    residentialAddress: element.residentialAddress,
                    status: element.status == true ? 'Active' : 'In Active',
                    travelOustSideInLast15Days: element.travelOustSideInLast15Days == true ? 'Yes' : 'No',
                    zoneId: element.zoneId,
                    contactWithCovidPeople: element.contactWithCovidPeople == true ? 'Yes' : 'No',
                    createdDate: element.createdDate,
                    employeeId: element.employeeId,
                    employeename: element.employee.name,
                    employeeCode: element.employee.employeeCode,
                    symptoms: this.getSymptoms(element.healthTrackSymptoms, ''),

                  }
                )
                console.log('questions');
                let result = this.getQuestions(element.healthTrackQuestionAnswers);
                // result.forEach(function (val, key) {
                //   arrdeclarationsToExport.push({ key: val });
                // });
                let dataToExport = Object.assign(arrdeclarationsToExport[index], result)
                // let    abc = arrdeclarationsToExport[index].merge({}, arrdeclarationsToExport[index], result)
                console.log('arr : ');
                console.log(dataToExport);
                console.log(result);
                this.declarationsToExport.push(dataToExport);
                console.log(this.declarationsToExport);
                // console.log(arrdeclarationsToExport);
                // this.declarationsToExport = arrdeclarationsToExport;
                //this.declarationsToExport.concat(this.getQuestions(element.healthTrackQuestionAnswers, []));
              });

              // this.declarationsToExport = data.body;
              console.log('these are declarations to Export');
              console.log(this.declarationsToExport);
              this.exportService.exportExcel(this.declarationsToExport, 'Declarations');
            }
            else {
              // this.declarations = [];
              this.snackBarService.showError('No declaration found.');
            }
          } else {
            // this.declarations = [];
            this.snackBarService.showError('No declaration found.');
          }
        },
        err => {
          //// this.isGetting = false;
          if (err.status >= 300) {
            // this.declarations = [];
            this.snackBarService.showError('No declaration found.');

          }

        }
      );
    }

  }

  getQuestions(questions: any) {

    var result = questions.reduce(function (map, obj) {
      map[obj.question] = obj.value;
      return map;
    }, {});
    return result;
  }

  getSymptoms(symptoms: any, symptom = '') {
    // let symptom = '';
    symptoms.forEach(element => {
      symptom += ',' + element.name
    });
    return symptom;
  }

  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.pageInfo.CurrentPage = pageNumber;
  }
  setPagingInfoFromResponse(result) {
    this.pageInfo = {
      CurrentPage: this.pageNumber,
      PageSize: result.pageSize,
      TotalCount: result.totalRecords,
      TotalPages: Math.ceil(result.totalRecords / result.pageSize)
    };
  }
}
