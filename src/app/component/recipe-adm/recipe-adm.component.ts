import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-recipe-adm',
  templateUrl: './recipe-adm.component.html',
  styleUrls: ['./recipe-adm.component.css']
})
export class RecipeAdmComponent implements OnInit {
  recetas: Receta[] = [];
  actualiza = false; 
  n_receta_form: FormGroup;
  receta_det_form: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Validación de autenticación
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.n_receta_form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      tipo_cocina: ['', Validators.required],
      pais_origen: ['', Validators.required],
      dificultad: ['', Validators.required],
      img_ruta: ['', Validators.required]
    });

    this.receta_det_form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      autor: ['', Validators.required],
      tipo_cocina: ['', Validators.required],
      pais_origen: ['', Validators.required],
      dificultad: ['', Validators.required],
      img_ruta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recipeService.getRecetas(undefined)?.subscribe((recipes: any) => {
      this.recetas = recipes;
    });
  }

  onSubmit() {
    if (this.n_receta_form.valid) {
      const nuevaReceta: Receta = this.n_receta_form.value;
      // this.recipeService.createReceta(nuevaReceta).subscribe((response) => {
      //   this.recetas.push(response);
      //   this.n_receta_form.reset(); // Limpiar el formulario
      // });
    }
  }

  detalleReceta(id: number) {
    this.actualiza = true;
    this.recipeService.getRecetas(id).subscribe((receta) => {
      console.log(receta);
      this.receta_det_form.patchValue(receta);
    });
  }

  actualizaReceta() {
    if (this.receta_det_form.valid) {
      const recetaActualizada: Receta = this.receta_det_form.value;
      // this.recipeService.updateReceta(recetaActualizada).subscribe(() => {
      //   this.actualiza = false;
      //   this.ngOnInit();
      // });
    }
  }

  limpiarFormN() {
    this.n_receta_form.reset();
  }

  cancelarEdicion() {
    this.actualiza = false;
    this.receta_det_form.reset();
  }
}
