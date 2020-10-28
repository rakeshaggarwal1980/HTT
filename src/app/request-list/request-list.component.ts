import {
  Component, OnInit, NgZone, ChangeDetectorRef, ApplicationRef,
  ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPLOYEE_ACTIONS, HR_ACTIONS, SECURITY_ACTIONS } from 'app/app.enum';
import { ViewRequestDialogComponent } from './shared/view-request-dialog/view-request-dialog.component';
import { RequestListService } from 'app/request-list/shared/request-list.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { ErrorService, SnackBarService, SpinnerService } from '../shared/index.shared';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { SORT_DIRECTION } from 'app/app.enum';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Subscription';

@Component({
  selector: 'evry-request-list',
  templateUrl: 'request-list.component.html',
  styleUrls: ['./shared/request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  Requests: any[] = [];
  viewRequestDialogRef: MatDialogRef<ViewRequestDialogComponent> = null;
  userId: number = 0;
  roleId: number = 0;
  errorDate: boolean = false;
  errorInput: boolean = false;
  searchInput = '';
  propertyName = '';
  submissionDate: any;
  isSuperAdmin: boolean = false;
  toDate: any;
  keyupSub: Subscription;
  isMyRequest: boolean = false;
  @ViewChild('search') inputElRef: ElementRef;
  categories: any[] = [{ id: 'requestnumber', value: 'Request Number' }, { id: 'status', value: 'Request Status' }, { id: 'employeeid', value: 'Employee code' }, { id: 'employeename', value: 'Employee Name' }, { id: 'daterange', value: 'Date Range' }];
  requestStatus: any[] = [{ id: 'pending', value: 'Pending' }, { id: 'approved', value: 'Approved' }, { id: 'declined', value: 'Declined' }];
  pageInfo: any = {
    CurrentPage: 1, PageSize: 10, TotalCount: 0, TotalPages: 0
  };
  pageNumber = 1;
  user: any = '';
  sortColumn = '';
  sortDirection = SORT_DIRECTION.DESC;
  sortDirectionStatus = {
    id: SORT_DIRECTION.DESC,
    employeename: SORT_DIRECTION.DESC,
    fromDate: SORT_DIRECTION.DESC,
    toDate: SORT_DIRECTION.DESC
  };
  selectedStatus: string = '';
  sortDirectionStatuskeys = Object.keys(this.sortDirectionStatus);
  declarationsToExport: any = [];
  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;
  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  fromDate: any;
  constructor(public dialog: MatDialog, private requestListService: RequestListService,
    private location: Location, private spinnerService: SpinnerService, private errorService: ErrorService,
    private snackbarService: SnackBarService, private ngzone: NgZone, private cdref: ChangeDetectorRef,
    private appref: ApplicationRef) {
  }

  ngOnInit() {
    debugger;
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user !== undefined && user !== '') {
      debugger;
      this.userId = user.userId;
      this.roleId = user.roles.find(r => r.roleId == 4) ? 4 : 1;

    }
    if (this.location.path() === '/requests') {
      this.isMyRequest = false;
      this.getAllRequests();
    } else {

      this.isMyRequest = true;
      this.categories.splice(2, 2);
      this.getAllRequestsByUserId();
    }
    this.isAuthenticated('NewDeclaration');
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
  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.pageInfo.CurrentPage = pageNumber;
    if (this.isMyRequest) {
      this.getAllRequestsByUserId();
    } else {
      this.getAllRequests();
    }
  }
  setPagingInfoFromResponse(result) {
    debugger;
    this.pageInfo = {
      CurrentPage: this.pageNumber,
      PageSize: result.pageSize,
      TotalCount: result.totalRecords,
      TotalPages: Math.ceil(result.totalRecords / result.pageSize)
    };
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
  getAllRequests() {
    this.spinnerService.startLoading();

    let searchSortModel = {
      propertyName: this.propertyName,
      searchString: (this.propertyName.toLowerCase() !== 'daterange' && this.propertyName.toLowerCase() !== 'status') ? this.searchInput :
        (this.propertyName.toLowerCase() == 'status' ? this.selectedStatus : (moment(this.fromDate).format() + '(to)' + moment(this.toDate).format())),
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      userId: this.userId,
      roleId: this.roleId,
      page: this.pageNumber,
      pageSize: 10,
      totalRecords: 0,
      SearchResult: {}
    };
    this.requestListService.getAllRequests(searchSortModel).subscribe(
      data => {
        this.spinnerService.stopLoading();
        if (data !== null || data !== undefined) {
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {
              if (data.body.searchResult.length > 0) {
                this.Requests = data.body.searchResult;
                this.setPagingInfoFromResponse(data.body);
                console.log('these are requests');
                console.log(this.Requests);
              }
              else {
                this.Requests = [];
              }
            }
          }
        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      err => {
        this.spinnerService.stopLoading();
        this.errorService.handleError(err);
      }
    );
  }

  onCategoryChange(category) {
    this.propertyName = category;
  }

  getAllRequestsByUserId() {
    debugger;
    if (this.userId !== 0 && this.userId !== null && this.userId !== undefined) {
      this.spinnerService.startLoading();
      debugger;
      console.log('this is submission date');
      console.log(this.submissionDate);
      let searchSortModel = {
        propertyName: this.propertyName,
        searchString: (this.propertyName.toLowerCase() !== 'daterange' && this.propertyName.toLowerCase() !== 'status') ? this.searchInput :
          (this.propertyName.toLowerCase() == 'status' ? this.selectedStatus : (moment(this.fromDate).format() + '(to)' + moment(this.toDate).format())),
        sortColumn: this.sortColumn,
        sortDirection: this.sortDirection,
        userId: this.userId,
        roleId: this.roleId,
        page: this.pageNumber,
        pageSize: 10,
        totalRecords: 0,
        SearchResult: {}
      };
      this.requestListService.getRequestsByUserId(searchSortModel).subscribe(
        data => {
          this.spinnerService.stopLoading();
          if (data !== null || data !== undefined) {
            if (!isNullOrUndefined(data)) {
              if (!isNullOrUndefined(data.body)) {
                if (data.body.searchResult.length > 0) {
                  this.Requests = data.body.searchResult;
                  this.setPagingInfoFromResponse(data.body);
                } else {
                  this.Requests = [];
                }
              }
            }
          } else {
            this.errorService.handleFailure(data.statusCode);
          }
        },
        err => {
          this.spinnerService.stopLoading();
          this.errorService.handleError(err);
        }
      );
    }
  }

  addEvent(datePickerType: any, type: string, event: MatDatepickerInputEvent<Date>) {
    debugger;
    if (datePickerType.toLowerCase() == 'fromdate') {
      this.fromDate = new Date(event.value);
    } else {
      this.toDate = new Date(event.value);
    }
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
        if (this.isMyRequest) {
          this.getAllRequestsByUserId();
        } else {
          this.getAllRequests();
        }
      } else {
        this.sortDirectionStatus[val] = SORT_DIRECTION.DESC;
      }
    });
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }

  onSearch(searchCategory: string) {
    debugger;
    this.propertyName = searchCategory;
    if (this.propertyName !== '') {
      if (this.propertyName.toLowerCase() == 'daterange' && !isNullOrUndefined(this.fromDate) && this.fromDate !== '' && !isNullOrUndefined(this.toDate) && this.toDate !== '') {
        if (this.isMyRequest) {
          this.getAllRequestsByUserId();
        } else {
          this.getAllRequests();
        }
      }
      else if (this.propertyName.toLowerCase() == 'status' && this.selectedStatus !== '' && this.selectedStatus !== null && this.selectedStatus !== undefined) {
        if (this.isMyRequest) {
          this.getAllRequestsByUserId();
        } else {
          this.getAllRequests();
        }
      }
      else if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename' || this.propertyName.toLowerCase() == 'requestnumber')
        && !isNullOrUndefined(this.searchInput) && this.searchInput !== '') {
        if (this.isMyRequest) {
          this.getAllRequestsByUserId();
        } else {
          this.getAllRequests();
        }
      } else {
        if (this.propertyName.toLowerCase() == 'daterange' && isNullOrUndefined(this.submissionDate) && this.submissionDate == '') {
          this.errorDate = true;
          this.errorInput = false;
          if (this.isMyRequest) {
            this.getAllRequestsByUserId();
          } else {
            this.getAllRequests();
          }
        } if ((this.propertyName.toLowerCase() == 'employeeid' || this.propertyName.toLowerCase() == 'employeename') && isNullOrUndefined(this.searchInput) && this.searchInput == '') {
          this.errorDate = false;
          this.errorInput = true;
          if (this.isMyRequest) {
            this.getAllRequestsByUserId();
          } else {
            this.getAllRequests();
          }
        }
      }
    }
    else {
      debugger;
      this.searchInput = '';
      //this.toInput.value = '';
      //this.fromInput.value = '';
      this.selectedStatus = '';
      this.propertyName = '';
      if (this.isMyRequest) {
        this.getAllRequestsByUserId();
      } else {
        this.getAllRequests();
      }
    }
  }

  viewRequest(request) {
    this.dialog.closeAll();
    this.viewRequestDialogRef = this.dialog.open(ViewRequestDialogComponent, {
      width: '800px',
      height: '470px',
      disableClose: false,
      panelClass: 'success-box',
      data: { request: request }
    });
    this.viewRequestDialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('request dialog');
        console.log(result);
      }
      this.viewRequestDialogRef = null;
    });
  }



}
