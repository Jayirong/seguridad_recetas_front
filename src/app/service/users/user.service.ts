import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuariosUrl = 'assets/JSON/usuarios.json'; // Ruta al archivo JSON
  private token: string | null = null; // Variable para almacenar el token

  constructor(private http: HttpClient) {}

  // Método para validar el login del usuario
  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<LoginResponse>(this.usuariosUrl, loginData).pipe(
      map(response => {
        this.token = response.token;
        return true; 
      }),
      catchError(error => {
        console.error('Error en el login:', error);
        return of(false);
      })
    );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token'); 
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null; 
  }
}
