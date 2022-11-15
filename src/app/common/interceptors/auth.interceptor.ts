import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('token') && this.hasAuthToken()) {
      const headers = req.headers.set('Authorization', `Bearer ${this.authService.access}`);
      return next.handle(req.clone({ headers }));
    }
    return next.handle(req);
  }

  private hasAuthToken(): boolean {
    return this.hasAccess() || this.hasRefresh();
  }

  private hasAccess(): boolean {
    return Boolean(this.authService.access);
  }

  private hasRefresh(): boolean {
    return Boolean(this.authService.refresh);
  }
}
