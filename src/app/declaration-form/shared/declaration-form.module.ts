import { TranslateModule } from '@ngx-translate/core';
// components
import { DeclarationFormComponent } from 'app/declaration-form/declaration-form.component';

// modules
import { DeclarationFormRouterModule } from 'app/declaration-form/shared/declaration-form.route';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatSnackBarModule } from 'vendor/material';

import { NgModule } from '@angular/core';
import { DeclarationService } from 'app/declaration-form/shared/declaration.service';
import { FormsModule, ReactiveFormsModule } from 'vendor/angular';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    DeclarationFormRouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  exports: [],
  declarations: [
    DeclarationFormComponent
  ],
  providers: [DeclarationService, SnackBarService],
})
export class DeclarationFormModule {
}
