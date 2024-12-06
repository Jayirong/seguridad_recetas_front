import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAdmComponent } from './user-adm.component';
import { UserService } from 'src/app/service/users/user.service';
import { of } from 'rxjs';
import { User } from 'src/app/model/usuario';

describe('UserAdmComponent', () => {
  let component: UserAdmComponent;
  let fixture: ComponentFixture<UserAdmComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAdmComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdmComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a user successfully', () => {
    const mockUser: User = {
      id_user: 1,
      username: 'johndoe',
      nombre: 'John',
      apellido: 'Doe',
      password: 'password123',
      roles: ['USER'],
      estado: true,
    };

    spyOn(userService, 'createUser').and.returnValue(of(mockUser));

    component.n_user_form.setValue({
      username: 'johndoe',
      nombre: 'John',
      apellido: 'Doe',
      password: 'password123',
      rol: 'USER',
    });

    component.onSubmit();

    expect(userService.createUser).toHaveBeenCalledWith({
      username: 'johndoe',
      nombre: 'John',
      apellido: 'Doe',
      password: 'password123',
      roles: 'USER',
    });

    // expect(component.n_user_form.valid).toBeTrue();
  });
});
