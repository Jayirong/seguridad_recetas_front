import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/usuario';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-user-adm',
  templateUrl: './user-adm.component.html',
  styleUrls: ['./user-adm.component.css']
})
export class UserAdmComponent implements OnInit {

  users : User[] =[];

  usr_det : User = {
    id:0,
    username:"",
    password:"",
    roles:[] // o-> usuario  /////|||||\\\\\\  1 -> admin
  };


  user_det_form :FormGroup;


  constructor( 
    private userService : UserService,
    private fb : FormBuilder
  ) { 
    this.user_det_form = this.fb.group({
      username:['',Validators.required]
    });
    

  }

  ngOnInit(): void {
    this.getAllUsers()

    // console.log(this.userService.getToken(),'adm controller')
  }

  getAllUsers(){
    this.userService.getUsers(undefined)?.subscribe((usuarios:any)=>{
      this.users = usuarios;
    })
  }

  detalleUser(pk:number){
    console.log(pk)

    this.userService.getUsers(pk)?.subscribe((user:any)=>{
      console.log(user)
      this.user_det_form.patchValue({
        username: user.username,
      });
    })
  }


  onSubmit(){

  }
}
