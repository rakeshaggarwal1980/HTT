import { Injectable, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from 'vendor/angular';
import { AppConstants } from 'app/shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';
import { AdalService } from './adal.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private adal: AdalService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.adal.isAuthenticated) {
      return true;
    } else {
      const url = state.url;
      if (!isNullOrUndefined(url) && url !== '') {
        // save link in local storage for redirection
        localStorage.setItem(AppConstants.RedirectUrl, url);
      }
      this.router.navigate(['home']);
      return false;
    }
  }
}

