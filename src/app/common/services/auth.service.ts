import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  ACCESS_TOKEN_KEY = 'access';

  REFRESH_TOKEN_KEY = 'refresh';

  get access(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY) ?? '';
  }

  set access(val: string) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, val);
  }

  get refresh(): string {
    return sessionStorage.getItem(this.REFRESH_TOKEN_KEY) ?? '';
  }

  set refresh(val: string) {
    sessionStorage.setItem(this.REFRESH_TOKEN_KEY, val);
  }

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${environment.urls.webapi}/token`, { username, password }).pipe(tap((res) => {
      this.access = res.access_token;
      this.refresh = res.refresh_token;
    }));
  }
}
