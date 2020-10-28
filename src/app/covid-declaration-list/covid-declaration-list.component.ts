import {
  Component, OnInit, Inject, NgZone, ChangeDetectorRef, ApplicationRef,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { EMPLOYEE_ACTIONS, HR_ACTIONS, SECURITY_ACTIONS } from 'app/app.enum';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
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
import { CovidDeclarationListService } from 'app/covid-declaration-list/shared/covid-declaration-list.service';
import { SnackBarService } from 'app/shared/index.shared';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';


@Component({
  selector: 'evry-covid-declaration-list',
  templateUrl: 'covid-declaration-list.component.html',
  styleUrls: ['./shared/covid-declaration-list.component.scss'],
})
export class CovidDeclarationListComponent implements OnInit, AfterViewInit {
  declarations: any[] = [];
  userId: number = 0;
  isSuperAdmin: boolean = false;
  errorDate: boolean = false;
  errorInput: boolean = false;
  searchInput = '';
  propertyName = '';
  submissionDate: any;
  keyupSub: Subscription;
  isMyDeclarations: boolean = false;
  @ViewChild('search') inputElRef: ElementRef;
  categories: any[] = [{ id: 'employeeid', value: 'Employee Code' }, { id: 'employeename', value: 'Employee Name' }, { id: 'date', value: 'Declaration Date' }];
  pageInfo: any = {
    CurrentPage: 1, PageSize: 10, TotalCount: 0, TotalPages: 0
  };
  pageNumber = 1;
  user: any = '';
  roleId: number = 0;
  sortColumn = '';
  sortDirection = SORT_DIRECTION.DESC;
  sortDirectionStatus = {
    id: SORT_DIRECTION.DESC,
    employeename: SORT_DIRECTION.DESC,
    createdDate: SORT_DIRECTION.DESC
  };
  sortDirectionStatuskeys = Object.keys(this.sortDirectionStatus);
  declarationsToExport: any = [];
  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;
  constructor(public dialog: MatDialog, private covidDeclarationListService: CovidDeclarationListService,
    private router: Router, private ngzone: NgZone, private cdref: ChangeDetectorRef,
    private appref: ApplicationRef, private snackBarService: SnackBarService,
    private exportService: ExportService, private spinnerService: SpinnerService, private location: Location) {
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
    console.log('this is unsubscribe');
    console.log(this.keyupSub);
    if (this.keyupSub !== undefined && this.keyupSub !== null) {
      this.keyupSub.unsubscribe();
    }
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    debugger;
    if (!isNullOrUndefined(user) && user !== '') {
      this.userId = user.userId;
      this.user = user;
      this.roleId = this.user.roles.find(r => r.roleId == 4) ? 4 : 1;

    }
    this.getAllCovidDeclarations();
    this.isAuthenticated('NewCovidDeclaration');
  }


  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    this.submissionDate = new Date(event.value);
  }

  onSortClick(column) {
    this.sortColumn = column;
    this.setSortDirectionStatus(column);
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
              isPermitted = true;
              this.isSuperAdmin = true;
              break;
            default:
              isPermitted = false;
          }
        });
        return isPermitted;
      }
    }
  }

  setSortDirectionStatus(propName) {
    this.sortDirectionStatuskeys.forEach((val) => {
      if (val === propName) {
        this.sortDirectionStatus[val] = (this.sortDirectionStatus[val] === SORT_DIRECTION.ASC) ?
          SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;
        this.sortDirection = this.sortDirectionStatus[val];
        this.getAllCovidDeclarations();
      } else {
        this.sortDirectionStatus[val] = SORT_DIRECTION.DESC;
      }
    });
  }

  onSearch(searchCategory: string) {
    debugger;
    this.propertyName = searchCategory;
    this.submissionDate = moment(this.submissionDate).format();
    if (this.propertyName !== '') {
      if (this.propertyName.toLowerCase() == 'date' && !isNullOrUndefined(this.submissionDate) && this.submissionDate !== '') {
        // if (this.isMyDeclarations) {
        //   this.getAllDeclarationsByUserId();
        // } else {
        this.getAllCovidDeclarations();
        // }
      } else if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename')
        && !isNullOrUndefined(this.searchInput) && this.searchInput !== '') {
        debugger;
        // if (this.isMyDeclarations) {
        //   this.getAllDeclarationsByUserId();
        // } else {
        this.getAllCovidDeclarations();
        // }
      } else {
        if (this.propertyName.toLowerCase() == 'date' && isNullOrUndefined(this.submissionDate) && this.submissionDate == '') {
          this.errorDate = true;
          this.errorInput = false;
          // if (this.isMyDeclarations) {
          //   this.getAllDeclarationsByUserId();
          //  } else {
          this.getAllCovidDeclarations();
          //  }
        } if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename') && isNullOrUndefined(this.searchInput) && this.searchInput == '') {
          this.errorDate = false;
          this.errorInput = true;
          // if (this.isMyDeclarations) {
          //   this.getAllDeclarationsByUserId();
          // } else {
          this.getAllCovidDeclarations();
          //}
        }
      }
    }
    else {
      this.searchInput = '';
      this.toInput.value = '';
      // if (this.isMyDeclarations) {
      //   this.getAllDeclarationsByUserId();
      // } else {
      this.getAllCovidDeclarations();
      //}
    }
  }
  // onExport() {
  //   this.getDeclarationsToExport();


  // }
  getAllCovidDeclarations() {

    if (this.userId !== 0 && !isNullOrUndefined(this.userId)) {

      this.spinnerService.startLoading();
      let searchSortModel = {
        propertyName: this.propertyName,
        searchString: this.propertyName.toLowerCase() !== 'date' ? this.searchInput : this.submissionDate,
        sortColumn: this.sortColumn,
        sortDirection: this.sortDirection,
        userId: this.userId,
        roleId: this.roleId,
        page: 1,
        pageSize: 10,
        totalRecords: 0,
        SearchResult: {}
      };
      console.log('search Model');
      console.log(searchSortModel);
      this.covidDeclarationListService.getCovidDeclarations(searchSortModel).subscribe(
        data => {
          debugger;
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {
              this.declarations = data.body.searchResult;
              this.setPagingInfoFromResponse(data.body);
              this.spinnerService.stopLoading();
              console.log('these are declarations of covid');
              console.log(data.body.searchResult);

            }
            else {
              this.declarations = [];
              this.spinnerService.stopLoading();
              // this.snackBarService.showError('No declaration found.');
            }
          } else {
            this.declarations = [];
            this.spinnerService.stopLoading();
            // this.snackBarService.showError('No declaration found.');
          }
        },
        err => {
          //// this.isGetting = false;
          if (err.status >= 300) {
            this.declarations = [];
            this.spinnerService.stopLoading();
            // this.snackBarService.showError('No declaration found.');

          }

        }
      );
    }

  }




  // getDeclarationsToExport() {
  //   if (this.userId !== 0 && !isNullOrUndefined(this.userId)) {
  //     this.spinnerService.startLoading();
  //     let searchSortModel = {
  //       propertyName: this.propertyName,
  //       searchString: this.propertyName.toLowerCase() !== 'date' ? this.searchInput : this.submissionDate,
  //       sortColumn: this.sortColumn,
  //       sortDirection: this.sortDirection,
  //       userId: this.userId,
  //       roleId: this.roleId,
  //       page: 1,
  //       pageSize: 10,
  //       totalRecords: 0,
  //       SearchResult: {}
  //     };
  //     this.declarationListService.getDeclarationToExport(searchSortModel).subscribe(
  //       data => {
  //         debugger;
  //         if (!isNullOrUndefined(data)) {
  //           if (!isNullOrUndefined(data.body)) {
  //             console.log('dec');
  //             console.log(data.body);
  //             let arrdeclarationsToExport = [];
  //             data.body.forEach((element: any, index) => {
  //               debugger;
  //               arrdeclarationsToExport.push(
  //                 {

  //                   Id: element.id,
  //                   locationId: element.locationId,
  //                   preExistHealthIssue: element.preExistHealthIssue,
  //                   requestNumber: element.requestNumber,
  //                   residentialAddress: element.residentialAddress,
  //                   status: element.status == true ? 'Active' : 'In Active',
  //                   travelOustSideInLast15Days: element.travelOustSideInLast15Days == true ? 'Yes' : 'No',
  //                   zoneId: element.zoneId,
  //                   contactWithCovidPeople: element.contactWithCovidPeople == true ? 'Yes' : 'No',
  //                   createdDate: element.createdDate,
  //                   employeeId: element.employeeId,
  //                   employeename: element.employee.name,
  //                   employeeCode: element.employee.employeeCode,
  //                   symptoms: this.getSymptoms(element.healthTrackSymptoms, ''),

  //                 }
  //               )
  //               console.log('questions');
  //               let result = this.getQuestions(element.healthTrackQuestionAnswers);
  //               // result.forEach(function (val, key) {
  //               //   arrdeclarationsToExport.push({ key: val });
  //               // });
  //               let dataToExport = Object.assign(arrdeclarationsToExport[index], result)
  //               // let    abc = arrdeclarationsToExport[index].merge({}, arrdeclarationsToExport[index], result)
  //               console.log('arr : ');
  //               console.log(dataToExport);
  //               console.log(result);
  //               this.declarationsToExport.push(dataToExport);
  //               console.log(this.declarationsToExport);
  //               // console.log(arrdeclarationsToExport);
  //               // this.declarationsToExport = arrdeclarationsToExport;
  //               //this.declarationsToExport.concat(this.getQuestions(element.healthTrackQuestionAnswers, []));
  //             });

  //             // this.declarationsToExport = data.body;
  //             console.log('these are declarations to Export');
  //             console.log(this.declarationsToExport);
  //             this.exportService.exportExcel(this.declarationsToExport, 'Declarations');
  //             this.spinnerService.stopLoading();
  //           }
  //           else {
  //             // this.declarations = [];
  //             this.spinnerService.stopLoading();
  //             this.snackBarService.showError('No declaration found.');
  //           }
  //         } else {
  //           // this.declarations = [];
  //           this.spinnerService.stopLoading();
  //           this.snackBarService.showError('No declaration found.');
  //         }
  //       },
  //       err => {
  //         //// this.isGetting = false;
  //         this.spinnerService.stopLoading();
  //         if (err.status >= 300) {
  //           // this.declarations = [];
  //           this.snackBarService.showError('No declaration found.');

  //         }

  //       }
  //     );
  //   }

  // }



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
