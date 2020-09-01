/**
 * The following class is intercepting the HTTP-request.
 * Make it possible to grab HTML status codes etc for instance logging or error handling.
 */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util'

@Injectable()
export class HttpInterceptorHandler implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  let headers = new Headers();

    let authToken = localStorage.getItem('auth_token');
    console.log('token');
    console.log(authToken);
    if (!isNullOrUndefined(authToken)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
