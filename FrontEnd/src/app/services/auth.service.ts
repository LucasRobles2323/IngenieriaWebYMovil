import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { config } from 'src/environments/config';
import { of } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private JWT_TOKEN_KEY = 'jwt_token';
  private baseUrl = config.url;

  constructor(private http: HttpClient) {}


}
