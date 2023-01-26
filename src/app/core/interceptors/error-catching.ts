import { Injectable } from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorStr = '';
                    if (error.error instanceof ErrorEvent) {
                      errorStr = `${error.error.message}`;
                    } else {
                      errorStr = `code: ${error.status},  Message: ${error.message}`;
                    }
                    alert('Server side error: '+errorStr);
                    return throwError(()=> { new Error(errorStr)});
                })
            )
    }
}
