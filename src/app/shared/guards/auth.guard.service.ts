import { Injectable, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from 'vendor/angular';
import { AppConstants } from 'app/shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
debugger;
    if (!isNullOrUndefined(user) && user !== '') {
      if (user.userId > 0) {
        return true;
      }

    }
   else {
      // const url = state.url;
      // if (!isNullOrUndefined(url) && url !== '') {
      //   // save link in local storage for redirection
      //   localStorage.setItem(AppConstants.RedirectUrl, url);
      // }
      this.router.navigate(['']);
      return false;
    }
  }
}

