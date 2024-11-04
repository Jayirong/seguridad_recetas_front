import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-user-adm',
  templateUrl: './user-adm.component.html',
  styleUrls: ['./user-adm.component.css']
})
export class UserAdmComponent implements OnInit {

  users : User[] =[];

  constructor( private userService : UserService) { }

  ngOnInit(): void {
    this.getAllUsers()

    console.log(this.userService.getToken(),'adm controller')
  }

  getAllUsers(){
    this.userService.getUsers()?.subscribe((usuarios:any)=>{
      this.users = usuarios;
    })
  }


}
