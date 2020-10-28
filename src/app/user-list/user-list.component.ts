import {
  Component, OnInit, NgZone, ChangeDetectorRef, ApplicationRef, ViewChild, ElementRef
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from 'app/user-list/shared/user.service';
import { SpinnerService, ErrorService, SnackBarService } from '../shared/index.shared';
import { RESPONSE_STATUS_ENUM } from '../app.enum';
import { UserDetailDialogComponent } from './shared/user-detail-dialog/user-detail-dialog.component';
import { CommonService } from '../shared/services/common.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { SORT_DIRECTION } from 'app/app.enum';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/Subscription';

@Component({
  selector: 'evry-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./shared/user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  errorInput: boolean = false;
  employees$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  userObj = null;
  viewUserDialogRef: MatDialogRef<UserDetailDialogComponent> = null;
  allRoles: any[] = [];
  searchInput: string = '';
  userId: number = 0;
  roleId: number = 0;
  @ViewChild('search') inputElRef: ElementRef;
  categories: any[] = [{ id: 'employeename', value: 'Employee Name' }, { id: 'email', value: 'Email' }, { id: 'role', value: 'Role' }];
  pageInfo: any = {
    CurrentPage: 1, PageSize: 10, TotalCount: 0, TotalPages: 0
  };
  pageNumber = 1;
  user: any = '';
  propertyName: string = '';
  sortColumn = '';
  sortDirection = SORT_DIRECTION.DESC;
  sortDirectionStatus = {
    id: SORT_DIRECTION.DESC,
    employeename: SORT_DIRECTION.DESC,
    employeecode: SORT_DIRECTION.DESC
  };
  selectedRole: number = 0;
  keyupSub: Subscription;
  sortDirectionStatuskeys = Object.keys(this.sortDirectionStatus);
  declarationsToExport: any = [];
  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;
  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;
  constructor(public dialog: MatDialog, private userService: UserService, private router: Router,
    private spinnerService: SpinnerService, private errorService: ErrorService,
    private snackbarService: SnackBarService, private commonService: CommonService,
    private ngzone: NgZone, private cdref: ChangeDetectorRef,
    private appref: ApplicationRef) {
  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user !== undefined && user !== '') {
      debugger;
      this.userId = user.userId;
      this.roleId = user.roles.find(r => r.roleId == 4) ? 4 : 1;

    }
    this.getRoles();
    this.getAllEmployees();
  }

  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.pageInfo.CurrentPage = pageNumber;
    this.getAllEmployees();
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
        this.getAllEmployees();
      } else {
        this.sortDirectionStatus[val] = SORT_DIRECTION.DESC;
      }
    });
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

  getRoles() {
    this.spinnerService.startLoading();
    this.commonService.getRoles().subscribe(
      (data) => {
        this.spinnerService.stopLoading();
        if (data !== null && data !== undefined) {
          if (data.body.length > 0) {
            this.allRoles = data.body;
            console.log('these are roles');
            console.log(this.allRoles);
            debugger;
            if (this.roleId != 4) {
              var indexOfRole = this.allRoles.findIndex(x => x.name.toLowerCase() == 'superadmin');
              this.allRoles.splice(indexOfRole,1);
            }
            console.log(this.allRoles);
          }
        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      (err) => {
        this.spinnerService.stopLoading();
        this.errorService.handleError(err);
      }
    );


  }

  getAllEmployees() {
    this.spinnerService.startLoading();
    let searchSortModel = {
      propertyName: this.propertyName,
      searchString: this.propertyName.toLowerCase() !== 'role' ? this.searchInput :
        this.selectedRole,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      userId: this.userId,
      roleId: this.roleId,
      page: this.pageNumber,
      pageSize: 10,
      totalRecords: 0,
      SearchResult: {}
    };
    this.userService.getAllEmployees(searchSortModel).subscribe(
      (data) => {
        this.spinnerService.stopLoading();
        if (data !== null || data !== undefined) {
          if (!isNullOrUndefined(data)) {
            if (!isNullOrUndefined(data.body)) {
              if (data.body.searchResult.length > 0) {
                this.employees$.next(data.body.searchResult);
                this.setPagingInfoFromResponse(data.body);
              }
              else {
                this.employees$.next([]);
              }
            }

          }

        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      (err) => {
        this.spinnerService.stopLoading();
        this.errorService.handleError(err);
      }
    );
  }

  onCategoryChange(category: any) {
    this.propertyName = category;
  }

  onRoleChange(role: any) {
    this.selectedRole = role;
  }

  viewUser(userObj) {
    this.dialog.closeAll();
    this.viewUserDialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '800px',
      height: '518px',
      disableClose: false,
      panelClass: 'success-box',
      data: { user: userObj, allRoles: this.allRoles }
    });
    this.viewUserDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllEmployees();
        this.snackbarService.showSuccess('User has been updated successfully!');
      }
      this.viewUserDialogRef = null;
    });
  }

  onSearch(searchCategory: string) {
    debugger;
    this.propertyName = searchCategory;
    if (this.propertyName !== '') {
      if (this.propertyName.toLowerCase() == 'role' && this.selectedRole > 0) {
        this.getAllEmployees();
      }
      else if ((this.propertyName.toLowerCase() == 'employeename' || this.propertyName.toLowerCase() == 'email')
        && !isNullOrUndefined(this.searchInput) && this.searchInput !== '') {
        this.getAllEmployees();
      } else {
        if ((this.propertyName.toLowerCase() == 'email' || this.propertyName.toLowerCase() == 'employeename') && isNullOrUndefined(this.searchInput) && this.searchInput == '') {
          // this.errorDate = false;
          this.errorInput = true;
          this.getAllEmployees();
        }
      }
    }
    else {
      debugger;
      this.searchInput = '';
      this.selectedRole = 0;
      this.propertyName = '';
      this.getAllEmployees();
    }
  }

  deleteEmployee(employeeId) {
    this.spinnerService.startLoading();
    this.userService.deleteEmployee(employeeId).subscribe((data) => {
      this.spinnerService.stopLoading();
      if (data !== null && data !== undefined) {
        if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
          this.snackbarService.showSuccess('Employee deleted successfully.');
          this.getAllEmployees();
        }
      } else {
        this.errorService.handleFailure(data.statusCode);
      }
    },
      (err) => {
        this.spinnerService.stopLoading();
        this.errorService.handleError(err);
      }
    );
  }

}
