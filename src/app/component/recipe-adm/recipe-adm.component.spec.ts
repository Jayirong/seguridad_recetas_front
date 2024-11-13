import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAdmComponent } from './recipe-adm.component';

describe('RecipeAdmComponent', () => {
  let component: RecipeAdmComponent;
  let fixture: ComponentFixture<RecipeAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
