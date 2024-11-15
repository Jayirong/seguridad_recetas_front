import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';


declare var bootstrap: any;  // Declarar Bootstrap para poder usar los modales

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recetas: Receta[] = [];
  detalleModal: any; 


  constructor(
    private recipeService: RecipeService,
    private usrService:UserService
  ) {}

  ngOnInit(): void {

    // if(this.usrService.isAuthenticated()){
    //   this.getRecetas();
    // }

    // console.log(this.usrService.getToken())

      this.getRecetas();


  }

  getRecetas(){
    this.recipeService.getRecetas(undefined)?.subscribe((recipes:any)=>{
      this.recetas= recipes;
    });
  }
  getRecetaById(pk:number){

  }

  recetaSeleccionada: any;

  verDetalle(id: number) {
    this.recetaSeleccionada = {
      id_recipe: id,
      nombre: "Rasdasdsad",
      fecha_creacion: "15-11-2024",
      descripcion: "Esta es una receta de ejemplo.",
      tipo_cocina: 1,
      pais_origen: 1,
      dificultad: 2,
      img_ruta: "ruta/a/imagen.jpg",
      idUser: 1,
      comments: []
    };

    this.recipeService.getRecetas(id).subscribe((receta:any)=>{
      this.recetaSeleccionada = receta;
    })

    this.detalleModal = new bootstrap.Modal(document.getElementById('detalleModal'), {});
    this.detalleModal.show();
  }

  cerrarModal() {
    // Verificamos si el modal existe antes de intentar cerrarlo
    if (this.detalleModal) {
      this.detalleModal.hide();
    }
  }

}
