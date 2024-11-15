import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recetas: Receta[] = [];

  constructor(
    private recipeService: RecipeService,
    private usrService:UserService
  ) {}

  ngOnInit(): void {

    if(this.usrService.isAuthenticated()){
      this.getRecetas();
    }

    // console.log(this.usrService.getToken())

    //   this.getRecetas();


  }

  getRecetas(){
    this.recipeService.getRecetas(undefined)?.subscribe((recipes:any)=>{
      this.recetas= recipes;
    });
  }

}
