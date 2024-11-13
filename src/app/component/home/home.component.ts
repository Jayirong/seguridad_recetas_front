import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recetas: Receta[] = [];

  constructor(private dataService: RecipeService) {}

  ngOnInit(): void {
      this.getRecetas();
  }

  getRecetas(){
    this.dataService.getRecetas(undefined)?.subscribe((recipes:any)=>{
      this.recetas= recipes;
    });
  }

}
