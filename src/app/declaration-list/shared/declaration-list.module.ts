import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from 'vendor/angular';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// components
import { DeclarationListComponent } from 'app/declaration-list/declaration-list.component';
// modules
import { DeclarationListRouterModule } from 'app/declaration-list/shared/declaration-list.route';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DeclarationListService } from 'app/declaration-list/shared/declaration-list.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatDialogModule,
    DeclarationListRouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [],
  declarations: [
    DeclarationListComponent

  ],
  providers: [DeclarationListService]
})
export class DeclarationListModule {
}
