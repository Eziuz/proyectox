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

export class PasswordService {

    private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

    constructor(private http: HttpClient) { }

    confirmEmail(email: string) {
        httpOptions.observe = 'response';
        const sUrl = `${this.serviceUrl}/DetalleEntrada`;
        return this.http.post(sUrl, {}).pipe(
            tap((resp: HttpResponse<any>) => {
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
        console.log(`Password Recovery: ${message}`);
    }

}
