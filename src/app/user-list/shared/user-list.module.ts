import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { UserListComponent } from 'app/user-list/user-list.component';
// modules
import { UserListRouterModule } from 'app/user-list/shared/user-list.route';
import { SharedModule } from 'app/shared/shared.module';

import { UserListService } from 'app/user-list/shared/user.service';
import { UserDetailDialogComponent } from './user-detail-dialog/user-detail-dialog.component';




@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatDialogModule,
    UserListRouterModule
  ],
  exports: [],
  declarations: [
    UserDetailDialogComponent,
    UserListComponent
  ],
  providers: [UserListService],
  entryComponents: [UserDetailDialogComponent]
})
export class UserListModule {
}
