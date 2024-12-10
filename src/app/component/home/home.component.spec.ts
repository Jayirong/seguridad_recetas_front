import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/service/users/user.service';
import { HomeComponent } from './home.component';
import { RecipeService } from 'src/app/service/recipes/recipe.service';
import { of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let recipeService: jasmine.SpyObj<RecipeService>;


  beforeEach(async () => {
    recipeService = jasmine.createSpyObj('RecipeService', ['getRecetas']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: RecipeService, useValue: recipeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should call getRecetas and update recetas on ngOnInit', () => {
    const mockRecetas = [
      {
        id_recipe: 1,
        nombre: 'nombre1',
        fecha_creacion: '2024',
        descripcion: 'mi descripcion',
        autor: 1,
        tipo_cocina: 1,
        pais_origen: 1,
        dificultad: '1',
        img_ruta: 'https://www.google.com',
        idUser: 1,
      },
      {
        id_recipe: 2,
        nombre: 'nombre2',
        fecha_creacion: '2023',
        descripcion: 'mi descripcion',
        autor: 1,
        tipo_cocina: 1,
        pais_origen: 1,
        dificultad: '1',
        img_ruta: 'https://www.google.com',
        idUser: 1,
      },
    ];

    recipeService.getRecetas.and.returnValue(of(mockRecetas));

    fixture.detectChanges();

    expect(recipeService.getRecetas).toHaveBeenCalledWith(undefined);

    expect(component.recetas).toEqual(mockRecetas);
  });
  

  // it('should show a detail when verDetalle is called', () => {
  //   const mockReceta = {
  //     id_recipe: 2,
  //     nombre: 'nombre2',
  //     fecha_creacion: '2023',
  //     descripcion: 'mi descripcion',
  //     autor: 1,
  //     tipo_cocina: 1,
  //     pais_origen: 1,
  //     dificultad: '1',
  //     img_ruta: 'https://www.google.com',
  //     idUser: 1,
  //   };
  
  //   const modalShowSpy = jasmine.createSpy('show');
  //   const modalMock = { show: modalShowSpy };
  
  //   component.detalleModal = modalMock as any; 
  //   recipeService.getRecetas.and.returnValue(of(mockReceta));
  
  //   component.verDetalle(2);
  
  //   expect(recipeService.getRecetas).toHaveBeenCalledWith(1);
  
  //   expect(component.recetaSeleccionada).toEqual(mockReceta);
  
  //   expect(modalShowSpy).toHaveBeenCalled();
  // });
  
  
  

  it('should close the modal when cerrarModal is called', () => {
    component.detalleModal = { hide: jasmine.createSpy('hide') };

    component.cerrarModal();

    expect(component.detalleModal.hide).toHaveBeenCalled();
  });

  
  
});