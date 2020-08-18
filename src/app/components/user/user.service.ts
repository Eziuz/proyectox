import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { retry, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { RouterLinkWithHref } from '@angular/router';

const httpOptions = {
    observe: null,
    params: null,
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'idEmpresa': ''
    })
};

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private serviceUrl = 'http://localhost:8080/HemotecSOA-1.0/HemotecApi';

    constructor(private http: HttpClient) { }

    getAll() {
        httpOptions.observe = 'response';
        const sUrl = `${this.serviceUrl}/Administracion/Usuarios`;
        return this.http.get(sUrl, {}).pipe(
            tap((resp: HttpResponse<any>) => {
                return resp;
            }),
            catchError((error) => this.handleError('user', error))
        );
    }

    getAllByBusiness(row) {
        const sUrl = `${this.serviceUrl}/Administracion/Usuarios/Empresa`;
        const req = {
            idEmpresa: row
        };
        return this.http.put(sUrl, req, {}).pipe(
            tap((resp: HttpResponse<any>) => {
                return resp;
            }),
            catchError((error) => this.handleError('user', error))
        );
    }

    createUser(row, password, idEmpresaI) {
        const request = {
            primerNombre: row.primerNombre,
            segundoNombre: row.segundoNombre,
            primerApellido: row.primerApellido,
            segundoApellido: row.segundoApellido,
            genero: row.genero,
            username: row.username,
            contrasena: password,
            correo: row.email,
            idEmpresa: idEmpresaI,
            idRol: row.rol
        };
        const sUrl = `${this.serviceUrl}/Administracion/Usuarios`;
        return this.http.put(sUrl, request, {}).pipe(
            tap((resp) => {
                return resp;
            }), catchError((error) => this.handleError('user', error))
        );
    }

    createAdminUser(row, password) {
        const request = {
            primerNombre: row.primerNombre,
            segundoNombre: row.segundoNombre,
            primerApellido: row.primerApellido,
            segundoApellido: row.segundoApellido,
            genero: row.genero,
            username: row.username,
            contrasena: password,
            correo: row.email
        };
        const sUrl = `${this.serviceUrl}/Administracion/Usuarios/RepresentanteLegal`;
        return this.http.put(sUrl, request, {}).pipe(
            tap((resp) => {
                return resp;
            }), catchError((error) => this.handleError('user', error))
        );
    }

    updateUserStatus(row, newStatus) {
        const request = {
            idPersona: row.idPersona,
            idEstado: newStatus
        };
        const sUrl = `${this.serviceUrl}/Administracion/Usuarios/Status`;
        return this.http.post(sUrl, request, {}).pipe(
            tap((resp) => {
                return resp;
            }), catchError((error) => this.handleError('user', error))
        );
    }

    handleError(operation = 'operation', result?: any) {
        console.log(result.error);
        this.log(`${operation} failed: ${result.message}`);
        return of(result);
    }

    log(message: string) {
        console.log(`UserService: ${message}`);
    }
}
