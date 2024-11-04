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

  actualiza:boolean = false;


  user_det_form :FormGroup;
  n_user_form : FormGroup;



  constructor( 
    private userService : UserService,
    private fb : FormBuilder
  ) { 
    this.user_det_form = this.fb.group({
      username:['',Validators.required]
    });
    this.n_user_form = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      rol:['',Validators.required],

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
      this.actualiza = true;
    })
  }



  limpiarFormN(){
    
    this.actualiza = false;

    this.n_user_form.reset();

  }

  limpiarFormDet(){
    this.actualiza = false;

    this.user_det_form.reset();

    this.usr_det = {
      id:0,
      username:"",
      password:"",
      roles:[] // o-> usuario  /////|||||\\\\\\  1 -> admin
    };
  }

  actualizaUser() {
    // Obtén los valores del formulario
    const formValues = this.user_det_form.value;
  
    const userToUpdate: any = {
      id: this.usr_det.id, 
      username: formValues.username,
      // password: this.usr_det.password, 
      roles: this.usr_det.roles 
    };
  
    this.userService.updateUser(userToUpdate).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.getAllUsers(); 
        this.limpiarFormDet(); 
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
  
  onSubmit() {
    const formValues = this.n_user_form.value;
  
    const newUser: User = {
      id: 0, 
      username: formValues.username,
      password: formValues.password,
      roles: [formValues.rol] 
    };
  
    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.getAllUsers(); 
        this.limpiarFormN(); 
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }
  
}
