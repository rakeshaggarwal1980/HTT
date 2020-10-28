import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { EntityStatus } from 'app/app.enum';
import { ErrorService, SpinnerService, SnackBarService } from 'app/shared/index.shared';

@Component({
  selector: 'evry-user-detail',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss'],
})
export class UserDetailDialogComponent implements OnInit {
  roleArr: any[] = [];
  isSuperAdmin: boolean = false;
  isHR: boolean = false;
  constructor(public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
    private errorService: ErrorService, private spinnerService: SpinnerService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null && user != '') {
      debugger;
      let roleSuperAdmin = user.roles.filter(role => role.roleId == 4);
      if (roleSuperAdmin.length > 0) {
        this.isSuperAdmin = true;
      } else {
        this.isSuperAdmin = false;
      }
      let roleHR = user.roles.filter(role => role.roleId == 1);
      if (roleHR.length > 0) {
        this.isHR = true;
      } else {
        this.isHR = false;
      }
    }
    this.bindRoles();
  }

  bindRoles() {
    this.roleArr = this.data.allRoles.map((role) => {
      const found = this.data.user.roles.find(el => el.roleId === role.id);
      if (found !== null && found !== undefined) {
        return {
          id: found.id,
          roleId: role.id, roleName: role.name, selected: true
        };
      } else {
        return {
          id: 0,
          roleId: role.id, roleName: role.name, selected: false
        };
      }

    });
  }

  handleChange(role) {
    role.selected = !role.selected;
  }

  takeAction(value) {
    let status = 0;
    if (value === 1) {
      status = EntityStatus.Accept;
    } else if (value === 0) {
      status = EntityStatus.Deny;
    }
    this.updateAccountStatus(this.data.user.id, status);
    this.dialogRef.close(true);
  }

  updateAccountStatus(userId, status) {
    this.spinnerService.startLoading();
    this.userService.updateAccountStatus(userId, status).subscribe(data => {
      this.spinnerService.stopLoading();
      if (data !== null && data.statusCode === 200) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        this.errorService.handleFailure(data.statusCode);
      }
    }, error => {
      this.spinnerService.stopLoading();
      this.dialogRef.close(false);
      this.errorService.handleError(error);
    });
  }

  updateEmployee(user) {
    console.log(user);
    user.roles = this.roleArr.filter(role => role.selected);
    this.spinnerService.startLoading();
    this.userService.updateEmployee(user).subscribe((data) => {
      this.spinnerService.stopLoading();
      if (data !== null && data.statusCode === 200) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        this.errorService.handleFailure(data.statusCode);
      }
    }, error => {
      this.spinnerService.stopLoading();
      this.dialogRef.close(false);
      this.errorService.handleError(error);
    });
  }
}
