import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/service/users/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeAdmComponent } from './recipe-adm.component';

describe('RecipeAdmComponent', () => {
  let component: RecipeAdmComponent;
  let fixture: ComponentFixture<RecipeAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeAdmComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});