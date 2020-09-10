import { ErrorComponent } from 'app/error/error.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const ERROR_ROUTES: Routes = [
    {
        path: '404',
        component: ErrorComponent,
    },
];


// @NgModule({
//     imports: [RouterModule.forRoot(ERROR_ROUTES)],
//     exports: [RouterModule]
//   })
//   export class ErrorRouterModule { }
export let ErrorRouterModule = RouterModule.forRoot(ERROR_ROUTES);
