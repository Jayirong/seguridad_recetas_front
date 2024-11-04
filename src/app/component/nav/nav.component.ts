import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  public no_auth = true;

  ngOnInit(): void {
    this.isAdmin()
  }

  isAdmin(){
    
    if(this.userService.isAuthenticated()){
      this.no_auth= false;
    }
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/home'])
  }

}
