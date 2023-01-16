import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
        setHeaders: {
        'X-RapidAPI-Key':'6e5d10f988msh37a8e16140aabebp17de59jsn82323891107b',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
      }
    });
    return next.handle(request);
  }
}
