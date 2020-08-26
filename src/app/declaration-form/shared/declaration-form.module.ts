import { TranslateModule } from '@ngx-translate/core';
// components
import { DeclarationFormComponent } from 'app/declaration-form/declaration-form.component';

// modules
import { DeclarationFormRouterModule } from 'app/declaration-form/shared/declaration-form.route';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { DeclarationService } from 'app/declaration-form/shared/declaration.service';
import { FormsModule, ReactiveFormsModule } from 'vendor/angular';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    DeclarationFormRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    DeclarationFormComponent
  ],
  providers: [DeclarationService],
})
export class DeclarationFormModule {
}
