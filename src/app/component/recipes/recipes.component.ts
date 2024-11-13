import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recetas: Receta[] = [];

  constructor(
    private recipeService: RecipeService,
    private userService:UserService,
    private router : Router
  ) {}

  ngOnInit(): void {

    if(!this.userService.isAuthenticated()){
      this.router.navigate(['/home']);
    } 

    this.recipeService.getRecetas(undefined)?.subscribe((recipes:any)=>{
      this.recetas= recipes;
    })



    // this.dataService.getRecetas().subscribe(
    //   (data: Receta[]) => {
    //     this.recetas = data;
    //   },
    //   (error) => {
    //     console.error('Error al cargar los datos:', error);
    //   }
    // );
  }

  verReceta(id:number){
    console.log(id)
  }
}
