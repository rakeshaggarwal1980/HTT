import { Injectable, Router } from 'vendor/angular';
// model
import { AuthInfo } from 'app/shared/guards/authInfo';
// Constants
import { AppConstants } from 'app/shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject, Observable } from 'rxJs';
import { AdalService } from './adal.service';

@Injectable()
export class AuthService {
  _validActions = new BehaviorSubject<any[]>(null);
  validActions: Observable<any[]> = this._validActions.asObservable();
  constructor(private router: Router, private adalService: AdalService) {
  }

  // public isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   if (token !== null) {
  //     return true;
  //   }
  //   return false;
  // }

  // Get token value
  // getToken(): any {
  //   const token = this.adalService.getCachedToken(environment.adalConfig.clientId);
  //   return !isNullOrUndefined(token) ? token : null;
  // }

  // remove token
  removeItem(key): boolean {
    localStorage.removeItem(key);
    localStorage.clear();
    return true;
  }

  reAuthorize() {
    this.router.navigate(['401']);
  }


  getProfile(): any {
    const profile = localStorage.getItem(AppConstants.Profile);
    return !isNullOrUndefined(profile) ? JSON.parse(profile) : null;
  }

  setProfile(data) {
    const authObj: AuthInfo = {
      userId: data.userId ? data.userId : '',
      userName: data.userName,
      companyName: data.company ? data.company : '',
      familyName: data.profile ? data.profile.family_name : '',
      givenName: data.profile ? data.profile.given_name : '',
      name: data.profile ? data.profile.name : '',
      token: data.token,
      isAdmin: data.isAdmin ? data.isAdmin : false,
      isPartnerUser: data.isPartnerUser ? data.isPartnerUser : false,
      isGuest: data.isGuest ? data.isGuest : false,
      groups: data.groups,
    };

    //this.setValidActions(authObj.isAdmin, authObj.isPartnerUser, authObj.isGuest);

    if (!isNullOrUndefined(authObj)) {
      if (authObj.userId && this._validActions.value !== null) {

        localStorage.setItem(authObj.userId + '-rights', JSON.stringify(this._validActions.value));
      }
    }

    localStorage.setItem(AppConstants.Profile, JSON.stringify(authObj));

  }

  getIsAdmin(): any {
    const profile = this.getProfile();
    return (profile !== null) ? profile.isAdmin : false;
  }

  // setValidActions(isAdmin, isPartner, isGuest) {
  //   let actions = [];
  //   if (isAdmin === true) {
  //     actions.push.apply(actions, Object.keys(VALID_ACTIONS));
  //   } if (isPartner === true) {
  //     actions.push.apply(actions, Object.keys(PARTNER_VALID_ACTIONS));
  //   } if (isGuest === true) {
  //     actions.push.apply(actions, Object.keys(GUEST_VALID_ACTIONS));
  //   } if (isAdmin === false && isPartner === false && isGuest === false) {
  //     actions = (Object.keys(GUEST_VALID_ACTIONS));
  //   }
  //   this._validActions.next(actions);
  // }

  isValidAction(action: any): any {
    let isValid;
    if (!isNullOrUndefined(this._validActions.value)) {
      this._validActions.value.forEach(x => {
        if (x === action) {
          isValid = true;
        } else {
          return false;
        }
      });
    } else {
      const profile = this.getProfile();
      if (!isNullOrUndefined(profile)) {
        const validActions = localStorage.getItem(profile.userId + '-rights');
        if (validActions !== null) {
          this._validActions.next(JSON.parse(validActions));
        }
      }

    }

    return isValid;
  }
}
