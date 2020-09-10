// Component
import { ThankYouComponent } from 'app/thank-you/thank-you.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const THANK_YOU_ROUTES: Routes = [
  {
    path: 'thanks',
    component: ThankYouComponent
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(THANK_YOU_ROUTES)],
//   exports: [RouterModule]
// })
// export class ThankYouRouterModule { }
export let ThankYouRouterModule = RouterModule.forRoot(THANK_YOU_ROUTES);
