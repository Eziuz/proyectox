import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { loginModel } from './login.model';

const httpOptions = {
  observe: null,
  params: null,
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'username': '',
    'password': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi/security';
  public isLogin = false;

  constructor(private http: HttpClient) { }

  login(row: loginModel) {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      username: row.username,
      password: row.password
    });

    httpOptions.observe = 'response';

    const sUrl = `${this.loginUrl}/authenticate`;

    return this.http.post<loginModel>(sUrl, {}, httpOptions).pipe(
      retry(3),
      tap((resp: HttpResponse<loginModel>) => {
        this.log(`login w/ id=${resp.body.username}`);
        return resp;
      }),
      catchError((error) => this.handleError('login', error))
    );
  }

  private handleError(operation = 'operation', result?: any) {
    console.log(result.error);

    this.log(`${operation} failed: ${result.message} `);

    return of(result);
  }

  private log(message: string) {
    console.log(`LoginService: ${message}`);
  }
}
