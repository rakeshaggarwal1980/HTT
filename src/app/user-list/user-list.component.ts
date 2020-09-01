import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserListService } from 'app/user-list/shared/user-list.service';

@Component({
  selector: 'evry-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./shared/user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  Requests: any[] = [];

  constructor(public dialog: MatDialog, private userListService: UserListService, private router: Router) {
  }

  ngOnInit() {

    //this.getAllRequests();


    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');
  }

  // getAllRequests() {
  //   let user = JSON.parse(localStorage.getItem('user'));
  //   if (!isNullOrUndefined(user) && user !== '') {
  //     this.requestListService.getRequestsByUserId(user.userId).subscribe(
  //       data => {
  //         if (!isNullOrUndefined(data)) {
  //           if (data.body.length > 0) {
  //             this.Requests = data.body;
  //             console.log('these are requests');
  //             console.log(this.Requests);

  //           }
  //         } else {
  //         }
  //       },
  //       err => {
  //         //// this.isGetting = false;
  //         if (err.status === 401) {
  //           console.log('error');
  //         }
  //       }
  //     );
  //   }

  // }

 


}
