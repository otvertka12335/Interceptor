import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {

  constructor () {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = !req.url.match(/\/public/) ? {'Authorization': 'Bearer ' + this.getToken()} : {}
    const cloned = req.clone({
      url: environment.API_URL + req.url,
      setHeaders: headers
    });
    return next.handle(cloned).pipe(
      catchError(err => {
        console.log('Error status code: ' + err.status);
        return throwError(err);
      })
    );
  }

  getToken() {
    return 'qweqwe123qweasdzxc123zxc';
  }


}
