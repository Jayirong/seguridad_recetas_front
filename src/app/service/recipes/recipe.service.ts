import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/model/receta';
import { UserService } from '../users/user.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private jsonUrl = 'assets/JSON/recetas.json'; 

  constructor(private http: HttpClient,
      private userService : UserService
  ) {}

  getRecetas(): Observable<Receta[]> {

    // Obtener el token del servicio

    return this.http.get<Receta[]>(this.jsonUrl);
  }


  postRecipe(){

  }
}
