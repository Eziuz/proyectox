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

export class SalidaService {
  private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

  constructor(private http: HttpClient) { }

  createSalida(row, business) {
    const request = {
      metodoPago: 1,
      empresa: business,
      precioTotal: (row.cantidad * row.precio),
      nPago: this.createNPago()
    };
    const sUrl = `${this.serviceUrl}/Salida`;
    return this.http.put(sUrl, request , {}).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => this.handleError('Salida', error))
    );
  }

  createDetalleSalida(row) {
    const request = {
      precio: (row.cantidad * row.precio),
      cantidad: row.cantidad,
      descuento: 0,
      detalleEntrada: row.idElemento
    };
    const sUrl = `${this.serviceUrl}/DetalleSalida`;
    return this.http.put(sUrl, request , {}).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => this.handleError('Salida', error))
    );
  }

  handleError(operation = 'operation', result?: any) {
    console.log(result.error);
    this.log(`${operation} failed: ${result.message}`);
    return of(result);
  }

  log(message: string) {
    console.log(`SalidaService: ${message}`);
  }

  createNPago() {
    const length = 30;
    const charset = '1abcd2efg3hi4jkl5mn6op7qrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}
