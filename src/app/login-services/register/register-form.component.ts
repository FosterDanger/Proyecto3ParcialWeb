import { Component,OnInit,Output,EventEmitter,Input } from "@angular/core";
import { Subscription } from "rxjs";
import { LoginService } from "../login.service";
import {OnDestroy} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit{

  form:FormGroup;

  constructor( public loginService: LoginService,  private router: Router) {
  }

  ngOnInit(){
    this.form = new FormGroup({
      "usuario": new FormControl(null, {
      validators:[Validators.required, Validators.minLength(3)]}),
      "email": new FormControl(null, {
      validators:[Validators.required, Validators.minLength(3), Validators.maxLength(20)]}),
      "contraseña": new FormControl(null, {
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(12)]})
    });
  }
  onSaveDataLogin(){
    if(this.form.invalid){
      return
    }
    this.loginService.addPost(this.form.value.usuario,this.form.value.email, this.form.value.contraseña)
    .subscribe(
      res => {
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor'
          },
          icon: 'success',
          text: 'Usuario registrado correctamente!',
          buttonsStyling: true,
          timer: 2000,
          showConfirmButton: false
    });
    this.router.navigateByUrl('');
      },
      err => {console.log(err)
        if(err === null){

        }else{
          this.router.navigateByUrl('/Register');
          Swal.fire({
            customClass: {
              confirmButton: 'swalBtnColor'
            },
            icon: 'warning',
            text: 'El usuario ya existe, ingresa uno diferente!',
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



