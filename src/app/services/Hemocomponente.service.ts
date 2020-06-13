import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { retry, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

const httpOptions = {
  observe: null,
  params: null,
};

@Injectable({
  providedIn: 'root'
})

export class HemocomponenteService {
  private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

  constructor(private http: HttpClient) { }

  getAll() {
    httpOptions.observe = 'response';
    const sUrl = `${this.serviceUrl}/Hemocomponente`;
    return this.http.get(sUrl, {}).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => this.handleError('hemocomponente', error))
    );
  }




  handleError(operation = 'operation', result?: any) {
    console.log(result.error);
    this.log(`${operation} failed: ${result.message}`);
    return of(result);
  }

  log(message: string) {
    console.log(`HemocomponenteService: ${message}`);
  }
}
