import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

export interface Obs<T> {
  loading?: boolean;
  value?: T;
  error?: string;
}
const defaultError = 'Error occurred';

@Pipe({
  name: 'loading',
})
export class LoadingPipe implements PipeTransform {
  transform<T = any>(val: Observable<T>): Observable<Obs<T>> {
      return val.pipe(
          map((value: any) => {
              return {
                  loading: value.type === 'start',
                  error: value.type === 'error' ? defaultError : '',
                  value: value.type ? value.value : value,
              };
          }),
          startWith({ loading: true }),
          catchError(error => of({ loading: false, error: typeof error === 'string' ? error : defaultError }))
      );
  }
}
