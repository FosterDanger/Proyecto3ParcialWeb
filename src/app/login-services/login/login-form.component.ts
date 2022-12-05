import { Component,OnInit,Output,EventEmitter,Input } from "@angular/core";
import { Subscription } from "rxjs";
import { PostService } from "src/app/publicaciones/post.service";
import { LoginService } from "../login.service";
import {OnDestroy} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit{

  form:FormGroup;

  constructor( public postsService: PostService, private router: Router, public loginService: LoginService) {
  }

  ngOnInit() {
    localStorage.removeItem('token');
    this.form = new FormGroup({
      "usuario": new FormControl(null, {
      validators:[Validators.required, Validators.minLength(3)]}),
      "contraseña": new FormControl(null, {
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(12)]})
    });
  }

  User = {
    usuario: '',
    email: '',
    contraseña: ''
  };
  Buttons(){
    this.router.navigateByUrl('/Register');
   // this.router.navigateByUrl('/Resultados');
    this.postsService.buttons$.emit(false);

  }

  Entrar(){
    if(this.form.invalid){
      return
    }
    this.User.usuario = this.form.value.usuario;
    this.User.email = ""
    this.User.contraseña = this.form.value.contraseña;
    this.loginService.entrar(this.User)
    .subscribe(
      res => {
        //console.log(res);
        console.log("Tokeeeen");
        localStorage.setItem('token', res.token)

        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor'
          },
          icon: 'success',
          text: 'Datos correctos!',
          buttonsStyling: true,
          timer: 1000,
          showConfirmButton: false
    });
        this.router.navigateByUrl('/Resultados');
      },

      err => {console.log(err)
        if(err === null){

        }else{
          Swal.fire({
            customClass: {
              confirmButton: 'swalBtnColor'
            },
            icon: 'error',
            text: 'Usuario o contraseña incorrectos!',
            confirmButtonColor: '#01AD49',
            confirmButtonText: '     OK     ',
            buttonsStyling: true
      });
        }
      }



    )
    //this.router.navigateByUrl('/Resultados');
  }
  }



