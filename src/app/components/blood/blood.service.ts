import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { bloodModel } from './blood.model';
import { retry, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

const httpOptions = {
  observe: null,
  params: null,
};

const requestBody = {
  id: null,
  fechaRecoleccion: null,
  fechaVencimiento: null,
  cantidad: null,
  precio: null,
  idHemocomponente: null,
  tipoHemocomponente: null,
  idNovedad: null,
  novedad: null,
  idEntrada: null,
  idSangre: null,
  tipoSangre: null,
  rutaImg: null
};

@Injectable({
  providedIn: 'root'
})

export class BloodService {
  private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

  constructor(private http: HttpClient) { }

  getAll() {
    httpOptions.observe = 'response';
    const sUrl = `${this.serviceUrl}/DetalleEntrada`;
    return this.http.get(sUrl, {}).pipe(
      tap((resp: HttpResponse<bloodModel>) => {
        return resp;
      }),
      catchError((error) => this.handleError('blood', error))
    );
  }




  handleError(operation = 'operation', result?: any) {
    console.log(result.error);
    this.log(`${operation} failed: ${result.message}`);
    return of(result);
  }

  log(message: string) {
    console.log(`BloodService: ${message}`);
  }
}
