import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-recipe-adm',
  templateUrl: './recipe-adm.component.html',
  styleUrls: ['./recipe-adm.component.css']
})
export class RecipeAdmComponent implements OnInit{

  recetas: Receta[]=[];


  constructor(
    private recipeService:RecipeService,
    private userService:UserService,
    private router:Router
  ){
    /**
         * con esto validamos que si no esta autenticado redirigimos a /home
         */
    if(!this.userService.isAuthenticated()){
      this.router.navigate(['/home']);
    }
  }


  ngOnInit():void{
    
    this.recipeService.getRecetas(undefined)?.subscribe((recipes:any)=>{
      this.recetas=recipes;
    });

  }




}
