import { Injectable, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from 'vendor/angular';
import { AppConstants } from 'app/shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    debugger;
    let user = JSON.parse(localStorage.getItem('user'));

    if (!isNullOrUndefined(user) && user !== '') {
      if (user.userId > 0) {
        return true;
      }

    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}

