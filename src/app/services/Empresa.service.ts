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

export class EmpresaService {
  private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

  constructor(private http: HttpClient) { }

  getAll() {
    httpOptions.observe = 'response';
    const sUrl = `${this.serviceUrl}/Empresa`;
    return this.http.get(sUrl, {}).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => this.handleError('business', error))
    );
  }

  createBusiness(row) {
    const request = {
        nombreEmpresa: row.nombreEmpresa,
        tipoEmpresa: row.tipoEmpresa,
        direccion: row.direccion,
        telefono: row.telefono,
        ciudad: row.ciudad,
        cuentaBancaria: row.cuentaBancaria
    };
    const sUrl = `${this.serviceUrl}/Empresa`;
    return this.http.put(sUrl, request, {}).pipe(
        tap((resp) => {
            return resp;
        }), catchError((error) => this.handleError('business', error))
    );
}


  handleError(operation = 'operation', result?: any) {
    console.log(result.error);
    this.log(`${operation} failed: ${result.message}`);
    return of(result);
  }

  log(message: string) {
    console.log(`EmpresaService: ${message}`);
  }
}
