// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { NavComponent } from './nav.component';
// import { HttpClientModule } from '@angular/common/http';
// import { UserService } from 'src/app/service/users/user.service';
// import { Router } from '@angular/router';

// describe('NavComponent', () => {
//   let component: NavComponent;
//   let fixture: ComponentFixture<NavComponent>;

//   let router : Router;

//   let serviceUsr :UserService;

//   beforeEach(async () => {

//     TestBed.configureTestingModule({
//       imports:[HttpClientModule],
//       providers:[UserService, Router]
//     });

//     serviceUsr = TestBed.inject(UserService);

//     router = TestBed.inject(Router)

//     await TestBed.configureTestingModule({
//       declarations: [ NavComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(serviceUsr).toBeTruthy();
//   });
// });

//#########################################
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavComponent } from './nav.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/service/users/user.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
