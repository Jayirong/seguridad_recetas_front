import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/model/receta';
import { UserService } from '../users/user.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private jsonUrl = 'assets/JSON/recetas.json'; 

  constructor(
    private http: HttpClient,
    private userService : UserService,
  ) {}

  getRecetas(pk:number | undefined) {

    // Obtener el token del servicio

    // return this.http.get<Receta[]>(this.jsonUrl);
    // console.log(this.getToken(),' token service')
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+this.userService.getToken());

    if(pk!=undefined){
      return this.http.get(environment.url_api+'/api/recipes/id/'+pk,{headers});  
    }

    return this.http.get(environment.url_api+'/api/recipes',{headers})
  }


  postRecipe(){

  }
}
