import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authToken = sessionStorage.getItem('token');
        let authReq: any;
        const newUrl = '';

        if (authToken && authToken.length > 10) {
            authReq = req.clone({
                url: newUrl,
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });
        } else {
            authReq = req.clone();
        }

        return next.handle(authReq).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        authToken = event.headers.get('Authorization');
                        if (authToken) {
                            sessionStorage.setItem('token', authToken);
                        }
                    }
                    return event;
                },
                error => error
            ));
    }
}
