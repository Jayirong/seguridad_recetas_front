import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/model/receta';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private jsonUrl = 'assets/JSON/recetas.json'; // Ruta al archivo JSON

  constructor(private http: HttpClient) {}

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.jsonUrl);
  }
}
