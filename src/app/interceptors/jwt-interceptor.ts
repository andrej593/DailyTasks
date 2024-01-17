import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = inject(AuthService).isLoggedIn();
    if (token) {
        req = req.clone({
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${token}`)
        });
    }
    return next(req);
}

