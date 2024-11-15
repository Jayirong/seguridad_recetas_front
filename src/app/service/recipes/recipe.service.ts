import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
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
      return this.http.get(environment.url_api+'/api/recipes/'+pk,{headers});  
    }

    return this.http.get(environment.url_api+'/api/recipes',{headers})
  }


  postRecipe(recipe:any):Observable<any>{
    const headers = this.getAuthHeaders(); // Genera las cabeceras de autenticación
    const url = `${environment.url_api}/api/recipes/user/${this.userService.getUserLogId()}`;
    
    return this.http.post(url, recipe, { headers })
      .pipe(
        catchError(
          this.handleError<any>('postReceta')
      )
    );
  }

  updateReceta(receta:any,pk:number): Observable<any> {
    const head = this.getAuthHeaders();
    return this.http.put(`${environment.url_api}/api/recipes/${pk}`, receta, {headers:head} )
      .pipe(
        catchError(this.handleError<any>('updateReceta'))
      );
  }

  
  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
