import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {};

    private readonly baseUrl = "http://localhost:3000/users";

    registerUser(userInfo: any) {
      // return new Promise(async (resolve, reject) => {
      //   await this.http.post(this.baseUrl, userInfo)
      //   .pipe(catchError(error => {
      //     resolve(error.error);
      //     return "";
      //   }))
      //   .toPromise()
      //   .then(response => resolve(response));
      // })
      
      return new Promise((resolve, response) => {
        this.http.post(this.baseUrl, userInfo)
        .pipe(catchError(error => {
          resolve(error.error);
          return "";
        }))
        .subscribe({
          next(response) { resolve(response) }
        })
      })
    }

    updateUser(id: string, data: any) {
      return new Promise((resolve, response) => {
        this.http.patch(`${this.baseUrl}/${id}`, data)
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