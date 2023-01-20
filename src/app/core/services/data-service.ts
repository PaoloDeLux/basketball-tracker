import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  fetch<T>(api: string, params?: HttpParams) : Observable<T>{
    return this.http
      .get<T>(api,{ params: params});
  }



}
