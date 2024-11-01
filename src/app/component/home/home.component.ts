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
    this.dataService.getRecetas().subscribe(
      (data: Receta[]) => {
        this.recetas = data;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

}
