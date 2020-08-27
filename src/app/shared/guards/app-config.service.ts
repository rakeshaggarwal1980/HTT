import { Injectable } from '@angular/core';
import { Observable } from 'vendor/rxJs';
import { AppConfig } from './app-config';
import { environment } from 'environments/environment';
import 'rxjs/add/observable/of';

/**
 * Define a function to be called during initialization that will load application configuration.
 * @param {AppConfigService} appConfig
 * @returns {() => Promise<void>}
 */
export function appConfigServiceInitializerFactory(appConfig: AppConfigService): Function {
  return () => appConfig.load();
}

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor() { }

  public loadConfig(): Observable<any> {
    return Observable.of(environment.adalConfig);
  }


  get getConfig(): any {
    return this.appConfig;
  }

  public load() {
    return this.loadConfig()
      .toPromise()
      .then(data => {
        this.appConfig = data;
        if (this.appConfig != null && this.appConfig.adalConfig != null) {
          // A bit of a hack: These must be set in the application
          this.appConfig.adalConfig.redirectUri = window.location.origin;
          this.appConfig.adalConfig.postLogoutRedirectUri = window.location.origin;
        }
      })
      .catch((err: any) => {
        // TODO  -should route to an error page
        console.log('Error retrieving configuration from server: ' + err);
      });
  }
}
