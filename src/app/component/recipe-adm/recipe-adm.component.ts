import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receta } from 'src/app/model/receta';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { UserService } from 'src/app/service/users/user.service';
import { User } from 'src/app/model/usuario';

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

  pk_receta:number|undefined;

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
      idUser: [{value:null, disabled:true}, Validators.required],
      tipo_cocina: ['', Validators.required],
      pais_origen: ['', Validators.required],
      dificultad: ['', Validators.required],
      img_ruta: ['', Validators.required]
    });

    this.receta_det_form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idUser: [{value:null, disabled:true}, Validators.required],
      tipo_cocina: ['', Validators.required],
      pais_origen: ['', Validators.required],
      dificultad: ['', Validators.required],
      img_ruta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRecetas();
  }

  getRecetas(){
    this.recipeService.getRecetas(undefined)?.subscribe((recipes: any) => {
      this.recetas = recipes;
    });
  }

  onSubmit() {
    if (this.n_receta_form.valid) {
      const nuevaReceta: Receta = this.n_receta_form.value;

      // this.userService.getUserDetail().subscribe((usr)=>{
      //   console.log(usr);
      // });

      this.recipeService.postRecipe(nuevaReceta).subscribe((response) => {
        this.recetas.push(response);
        this.n_receta_form.reset(); 
        alert('Registrado correctamente');  
      });
    }
  }
  deleteReceta(pk:number){
    this.recipeService.deleteRecipe(pk).subscribe((response:any)=>{
      console.log(response)
      this.getRecetas()

    });

  }

  detalleReceta(id: number) {
    this.actualiza = true;

    this.pk_receta= id;

    // console.log(id)
    // return

    this.recipeService.getRecetas(id).subscribe((receta) => {
      console.log(receta);
      this.receta_det_form.patchValue(receta);
    });
  }

  actualizaReceta() {



    if (this.receta_det_form.valid) {
      const recetaActualizada: Receta = this.receta_det_form.value;
      if(this.pk_receta){
        this.recipeService.updateReceta(recetaActualizada, this.pk_receta)?.subscribe(() => {
          this.actualiza = false;
          this.ngOnInit();
        });
      }
      
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
