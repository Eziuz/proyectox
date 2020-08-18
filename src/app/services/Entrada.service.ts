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

export class EntradaService {
    private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

    constructor(private http: HttpClient) { }

    createEntrada(row) {
        const request = {
            empresa: row.empresa,
            npago: row.npago,
            idPersona: row.idPersona
        };
        const sUrl = `${this.serviceUrl}/Entrada`;
        return this.http.put(sUrl, request, {}).pipe(
            tap((resp) => {
                return resp;
            }),
            catchError((error) => this.handleError('Entrada', error))
        );
    }

    handleError(operation = 'operation', result?: any) {
        console.log(result.error);
        this.log(`${operation} failed: ${result.message}`);
        return of(result);
    }

    log(message: string) {
        console.log(`EntradaService: ${message}`);
    }
}
