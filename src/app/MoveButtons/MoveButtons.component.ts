import { Component, OnInit,ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { PostService } from "../publicaciones/post.service";
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NavigationStart, Event as NavigationEvent } from '@angular/router';

// Aqui se crea un componente en este caso el header
@Component({
  selector: 'app-MoveButtons',
  templateUrl: './MoveButtons.component.html',
  styleUrls: ['./MoveButtons.component.css'],
})
export class MoveButtonsComponent implements OnInit {
  constructor(
    private router: Router,
    public postsService: PostService,
    private location: Location
  ) {}

  constador: number = 1;
  banderaForm1: boolean = false;
  banderaButtonsOpinion: boolean = false;
  @ViewChild('postForm') public postForm: NgForm;
  urlId: string;

  /* rutasMenos(){
  if(this.router.url === '/'){

  }else if(this.router.url === '/Qualification'){
    this.router.navigateByUrl('/');
  }else if(this.router.url === '/Post'){
    this.router.navigateByUrl('/Qualification');
  }

} */

  hideComponent: boolean = false;

  ngOnInit() {
    this.postsService.buttons$.subscribe((bandera) => {
      this.hideComponent = bandera;
    });

    this.postsService.buttonsOpinion$.subscribe((bandera) => {
      this.banderaButtonsOpinion = bandera;
    });

    this.postsService.validarButtons$.subscribe((bandera) => {
      this.banderaForm1 = bandera;
    });

    this.postsService.urlEdit$.subscribe((bandera) => {
      this.urlId = bandera;
    });
  }

  rutasMas() {
    console.log(this.urlId);
    if (this.router.url.includes('create')) {
      this.postsService.clienteButtons$.emit(true);

      if (this.banderaForm1 == true) {
        this.router.navigateByUrl('/Qualification');
      }
    } else if (this.router.url.includes('/Qualification')) {
      /*   if(this.postsService.servicio.length != 0){
    this.postsService.ocultarButtons$.emit(false);
    this.postsService.addPost(this.postsService.Cliente[0].nombre,this.postsService.Cliente[0].estado,
    this.postsService.Cliente[0].ciudad,this.postsService.Cliente[0].sucursal,this.postsService.servicio[0].servicio,this.postsService.servicio[0].calificacionServicio,"asd");
    this.postsService.Cliente=[];
    this.postsService.servicio = [];
    this.postsService.buttons$.emit(false);
    this.router.navigateByUrl('/Resultados');

    }else{
      Swal.fire({
        customClass: {
          confirmButton: 'swalBtnColor'
        },
        icon: 'warning',
        text: 'Antes de seguir, califica un servicio!',
       confirmButtonColor: '#01AD49',
        buttonsStyling: true
  });
    } */

      if (this.postsService.servicio.length != 0) {
        this.router.navigateByUrl('/Opinion');
      } else {
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor',
          },
          icon: 'warning',
          text: 'Antes de seguir, califica un servicio!',
          confirmButtonColor: '#01AD49',
          buttonsStyling: true,
        });
      }
    } else if (this.router.url.includes('Opinion')) {
      this.postsService.buttonsOpinion$.emit(true);
      if (this.postsService.recomendacionArr.length != 0) {
        this.postsService.ocultarButtons$.emit(false);
        this.postsService.buttons$.emit(false);
        this.postsService.addPost(
          this.postsService.Cliente[0].nombre,
          this.postsService.Cliente[0].estado,
          this.postsService.Cliente[0].ciudad,
          this.postsService.Cliente[0].sucursal,
          this.postsService.servicio[0].servicio,
          this.postsService.servicio[0].calificacionServicio,
          this.postsService.recomendacionArr[0].recomendacion
        );
        this.postsService.Cliente = [];
        this.postsService.servicio = [];
        this.postsService.recomendacionArr = [];
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor'
          },
          icon: 'success',
          text: 'Encuesta realizada correctamente!',
          buttonsStyling: true,
          timer: 1000,
          showConfirmButton: false
    });
        this.router.navigateByUrl('/Resultados');
      } else {
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor',
          },
          icon: 'warning',
          text: 'Antes de seguir, agrega una recomendacíon!',
          confirmButtonColor: '#01AD49',
          buttonsStyling: true,
        });
      }
    } else if (this.router.url === '/Resultados') {
    }

    if (this.router.url.includes('/edit')) {
      this.postsService.clienteButtons$.emit(true);

      if (this.banderaForm1 == true) {
        this.router.navigate(['/Cal', this.urlId]);
      }
    } else if (this.router.url.includes('/Cal')) {
      /*  console.log(this.postsService.Cliente);
      console.log(this.postsService.servicio)
      this.postsService.updatePost(this.urlId,
        this.postsService.Cliente[0].nombre,this.postsService.Cliente[0].estado,
    this.postsService.Cliente[0].ciudad,this.postsService.Cliente[0].sucursal,this.postsService.servicio[0].servicio,this.postsService.servicio[0].calificacionServicio,"asd")
    this.postsService.buttons$.emit(false);
    this.router.navigateByUrl('/Resultados'); */
      if (this.postsService.servicio.length != 0) {
        this.router.navigate(['/edRecomendacion', this.urlId]);
      } else {
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor',
          },
          icon: 'warning',
          text: 'Antes de seguir, califica un servicio!',
          confirmButtonColor: '#01AD49',
          buttonsStyling: true,
        });
      }
    } else if (this.router.url.includes('/edRecomendacion')) {
      this.postsService.buttonsOpinion$.emit(true);
      if (this.postsService.recomendacionArr.length != 0) {
        this.postsService.updatePost(
          this.urlId,
          this.postsService.Cliente[0].nombre,
          this.postsService.Cliente[0].estado,
          this.postsService.Cliente[0].ciudad,
          this.postsService.Cliente[0].sucursal,
          this.postsService.servicio[0].servicio,
          this.postsService.servicio[0].calificacionServicio,
          this.postsService.recomendacionArr[0].recomendacion
        );
        this.postsService.buttons$.emit(false);
        this.postsService.Cliente = [];
        this.postsService.servicio = [];
        this.postsService.recomendacionArr = [];
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor'
          },
          icon: 'success',
          text: 'Encuesta guardada correctamente!',
          buttonsStyling: true,
          timer: 1000,
          showConfirmButton: false
    });
        this.router.navigateByUrl('/Resultados');
      } else {
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor',
          },
          icon: 'warning',
          text: 'Antes de seguir, agrega una recomendacíon!',
          confirmButtonColor: '#01AD49',
          buttonsStyling: true,
        });
      }
    } else if (this.router.url === '/Resultados') {
    }
  }
}
