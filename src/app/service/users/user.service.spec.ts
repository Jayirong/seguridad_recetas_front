import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/usuario';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the token from localStorage if no token in service', () => {
    localStorage.setItem('token', 'fake-token');
    expect(service.getToken()).toBe('fake-token');
  });

  it('should store token in service and localStorage when login is successful', () => {
    const mockResponse = { token: 'fake-token' };
    spyOn(service, 'getUserDetail').and.returnValue(of({ id_user: 1 }));

    service.login('testuser', 'testpassword');

    const req = httpMock.expectOne(`${environment.url_api}/api/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(service.getToken()).toBe('fake-token');
    expect(service.id_usuario_log).toBe(1);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call logout and clear token', () => {
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.getToken()).toBeNull();
  });

  it('should return true for isAuthenticated if token is in localStorage', () => {
    localStorage.setItem('token', 'fake-token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated if token is not in localStorage', () => {
    localStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should call getUsers and return users list', () => {
    const mockUsers = [{ id_user: 1, username: 'testuser', nombre: 'Test', apellido: 'User' }];
    const token = 'fake-token';
    spyOn(service, 'getToken').and.returnValue(token);

    service.getUsers(undefined)?.subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${environment.url_api}/api/admin/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should call createUser and return created user', () => {
    const newUser = { username: 'newuser', password: 'password' };
    const mockResponse = { id_user: 1, username: 'newuser' };

    service.createUser(newUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url_api}/api/user/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call updateUser and return updated user', () => {
    const updatedUser = { username: 'updateduser', password: 'newpassword' };
    const mockResponse = { id_user: 1, username: 'updateduser' };

    service.updateUser(updatedUser, 'existinguser').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url_api}/api/admin/user/update/existinguser`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
});
