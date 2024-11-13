import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private usuarioService: UserService, private router: Router) {}

  onSubmit(): void {

    let token = this.usuarioService.login(this.username, this.password)


    // console.log(this.usuarioService.getToken())

    // if (this.usuarioService.login(this.username, this.password)) {
    //   // Redirigir al usuario si la autenticación es exitosa
    //   this.router.navigate(['/home']); // Cambia '/home' por la ruta que desees
    // } else {
    //   // Mostrar mensaje de error si la autenticación falla
    //   this.errorMessage = 'Usuario o contraseña incorrectos';
    // }
  }

}
