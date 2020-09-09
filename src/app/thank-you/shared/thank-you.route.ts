// Component
import { ThankYouComponent } from 'app/thank-you/thank-you.component';
import { RouterModule, Routes } from '@angular/router';


const THANK_YOU_ROUTES: Routes = [
  {
    path: 'thanks',
    component: ThankYouComponent
  },
];

export let ThankYouRouterModule = RouterModule.forRoot(THANK_YOU_ROUTES);
