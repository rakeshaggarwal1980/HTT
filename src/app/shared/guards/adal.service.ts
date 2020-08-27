import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'vendor/rxJs';
// noinspection ES6UnusedImports
import { } from 'adal';
import { AppConfigService } from './app-config.service';
import User = adal.User;


@Injectable()
export class AdalService {
  private _authContext: adal.AuthenticationContext = null;

  constructor(private appConfig: AppConfigService) {
  }

  get isInitialized(): boolean {
    return this.config !== null;
  }

  private get authContext() {
    if (this._authContext === null && this.config !== null) {
      this._authContext = new AuthenticationContext(this.config);
    }
    return this._authContext;
  }

  /**
   * Get the configuration for ADAL
   * @returns {adal.Config}
   */
  get config(): adal.Config {
    if (this.appConfig.getConfig) {
      return this.appConfig.getConfig;
    } else {
      return null;
    }
  }

  /**
   * Check if the session is authenticated (has an id token).
   * @returns {boolean}
   */
  get isAuthenticated(): boolean {
    if (this.config == null) {
      return false;
    } else {
      const user = this.user;
      const token = this.authContext.getCachedToken(this.config.clientId);
      return !!user && !!token;
    }
  }

  get user(): User {
    return this.authContext != null ? this.authContext.getCachedUser() : null;
  }

  get roles(): string[] {

    return this.user != null && this.user.profile != null
      ? this.user.profile.roles
      : null;
  }

  /**
   * Perform login
   */
  public login() {
    if (this.authContext != null) {
      this.authContext.login();
    } else {
      console.error('Login failed, no authentication context found!');
    }
  }

  /**
   * Perform logout
   */
  public logout() {
    if (this.authContext != null) {
      this.authContext.logOut();
    }
  }

  /**
   * This method must be called when AD authentication is completed and redirects back to this
   * SPA, to ensure that the token is added to the session. This is done from AppComponent in our sample.
   */
  public handleWindowCallback() {
    if (this.authContext != null) {
      this.authContext.handleWindowCallback();
    } else {
      console.error('ADAL callback failed, no authentication context found!');
    }
  }

  /**
   * Retrieve the client (id) token
   * @returns {string}
   */
  get clientToken(): string {
    return this.authContext != null ? this.authContext.getCachedToken(this.config.clientId) : null;
  }

  /**
   * Retrieve an access token for a defined resource.
   * The resources correspond to endpoints in the adal configuration
   * @param {string} resource
   * @returns {Observable<any>}
   */
  public acquireToken(resource: string): Observable<any> {
    if (this.authContext != null) {
      return new Observable<any>(subscriber =>
        this.authContext.acquireToken(resource, (message: string, token: string) => {
          subscriber.next(token);
        })
      );
    } else {
      Observable.throw('Failed to acquire token, no authentication context found!');
    }
  }
}
