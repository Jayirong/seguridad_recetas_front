import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService : UserService) { }

  public no_auth = true;

  ngOnInit(): void {
  }

  isAdmin(){
    if(!this.userService.isAuthenticated() || this.userService.userlog.rol != 1){
      this.no_auth = true
    }
    if(this.userService.isAuthenticated() && this.userService.userlog.rol ==1){
      this.no_auth= false;
    }
  }


}
