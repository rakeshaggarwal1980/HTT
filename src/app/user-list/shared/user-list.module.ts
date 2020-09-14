import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { UserListComponent } from 'app/user-list/user-list.component';
// modules
import { UserListRouterModule } from 'app/user-list/shared/user-list.route';
import { SharedModule } from 'app/shared/shared.module';

import { UserService } from 'app/user-list/shared/user.service';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatDialogModule,
    UserListRouterModule,
    MatIconModule
  ],
  exports: [],
  declarations: [
    UserDetailDialogComponent,
    UserListComponent
  ],
  providers: [UserService],
  entryComponents: [UserDetailDialogComponent]
})
export class UserListModule {
}
