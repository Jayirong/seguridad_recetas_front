import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/loginresponse';
import { User } from 'src/app/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuariosUrl = 'assets/JSON/usuarios.json';

  private token: string | null = null; 
  

  public userlog: User = {
    id:0,
    username:"",
    nombre:"",
    apellido:"",
    password:"",
    rol:0,
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {

    this.http.post('http://localhost:8080/api/auth/login', { username, password }).subscribe((response: any) => {
      localStorage.setItem('token', response.token);

      this.token = response.token

      return response.token;
    });
  



    // const loginData = { username, password };
    // return this.http.post<LoginResponse>(this.usuariosUrl, loginData).pipe(
    //   map(response => {
    //     if(response.error){
    //       return false;
    //     }
    //     this.token = response.token;
    //     return true; 
    //   }),
    //   catchError(error => {
    //     console.error('Error en el login:', error);
    //     return of(false);
    //   })
    // );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token'); 
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null; 
  }
}
