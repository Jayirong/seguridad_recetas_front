import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/loginresponse';
import { User } from 'src/app/model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuariosUrl = 'assets/JSON/usuarios.json';

  private token: string | null = null; 
  
  private url : string = 'http://localhost:8080';

  public userlog: User = {
    id:0,
    username:"",
    nombre:"",
    apellido:"",
    password:"",
    rol:0,
  };

  constructor(private http: HttpClient,
    private router : Router
  ) {}

  login(username: string, password: string) {

    this.http.post(this.url+'/api/auth/login', { username, password }).subscribe((response: any) => {
      localStorage.setItem('token', response.token);

      this.token = response.token

      this.router.navigate(['/home'])

      return response.token;
    });
  
  }

  getUsers(){

    if(!this.isAuthenticated()){
      this.router.navigate(['/home']);
      return null;
    }


    console.log(this.getToken(),' token service')
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.getToken());


    return this.http.get(this.url+'/api/admin/users',{headers})
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token'); 
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null; 
  }
}
