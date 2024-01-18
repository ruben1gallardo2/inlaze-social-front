import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterResponse } from '../../models/register-response.model';
import { UserRegisterRequest } from '../../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient)
    //podriamos configurar un env para que nos direccoine a prod, preprod, dev y local, a efectos de practica dejare el local
  register(body: UserRegisterRequest): Observable<UserRegisterResponse> {
    const { fullName, password, email } = body
    return this.http.post<UserRegisterResponse>("http://localhost:3000/auth/register", {
      fullName,
      password,
      email
    })
  }
}
