import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {};

  private readonly baseUrl: any = "http://localhost:3000/auth/login";

  login(email: string, password: string) {
    return new Promise((resolve, response) => {
      this.http.post(this.baseUrl, {email, password})
      .pipe(catchError(error => {
        resolve(error.error);
        return "";
      }))
      .subscribe({
        next(response) { resolve(response) }
      })
    })
  }
}