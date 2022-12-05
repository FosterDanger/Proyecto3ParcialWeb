import { Component, OnInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, VERSION } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { BehaviorSubject } from 'rxjs';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { PostService } from '../post.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { datosCliente } from "../post.model";
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';


// import Swiper core and required components


// Aqui se crea un componente en este caso el header
@Component({
  selector: 'app-qualification-service',
  templateUrl: './qualification-service.component.html',
  styleUrls: ['./qualification-service.component.css']
})

export class QualificationServiceComponent implements OnInit  {
  private mode = 'Qualification';
  private postId: string;
  post: datosCliente;
  name= 'Angular' + VERSION.major;
  currentRate= 0;
  currentRate1= 0;
  currentRate2= 0;
  currentRate3= 0;
  currentRate4= 0;
  currentRate5= 0;

  calificaion: string;
  nombreServicio: string;

  ratingControl = new FormControl(0);
  ratingControl1 = new FormControl(0);
  ratingControl2 = new FormControl(0);
  ratingControl3 = new FormControl(0);
  ratingControl4 = new FormControl(0);
  ratingControl5 = new FormControl(0);
ngOnInit(){



  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if(paramMap.has('postId')){
      this.mode = 'Cal';
      this.postId = paramMap.get('postId');
      //this.post = this.postsService.getPost(this.postId);
      this.postService.getPost(this.postId).subscribe(postData => {
        this.post = {id: postData._id, nombre: postData.nombre,estado: postData.estado, ciudad: postData.ciudad
        ,sucursal: postData.sucursal, servicio: postData.servicio, calificacionServicio: postData.calificacionServicio
      ,recomendacion: postData.recomendacion}
          this.postService.addServicio(postData.servicio,postData.calificacionServicio);

          if(postData.servicio === 'Mastografía'){
            this.currentRate = +postData.calificacionServicio[0];
          } else if( postData.servicio ==='Laboratorio'){
            this.currentRate1 = +postData.calificacionServicio[0];
          } else if(postData.servicio === 'Ultrasonido'){
            this.currentRate2 = +postData.calificacionServicio[0];
          }else if(postData.servicio === 'Lentes'){
            this.currentRate3 = +postData.calificacionServicio[0];
          }else if(postData.servicio === 'Electrocardiograma'){
            this.currentRate4 = +postData.calificacionServicio[0];
          }else if(postData.servicio === 'Tomografía'){
            this.currentRate5 = +postData.calificacionServicio[0];
          }

          this.nombreServicio = postData.servicio;
      });
    }else{
      this.mode = 'Qualification';
      this.postId = null;
    }
  })

}



constructor(private bottomSheet: MatBottomSheet, private postService: PostService, public route: ActivatedRoute){}

  showlist: boolean = false;
  getRating(valor){
    if(valor === 0){
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
    } else if(valor === 1){
      this.currentRate = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
    } else if(valor === 2){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
    }  else if(valor === 3){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
    } else if(valor === 4){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate5 = 0;
    } else if(valor === 5){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
    }

  }

  openSheet(valor){
    this.postService.servicio = [];
   /*  this.bottomSheet.open(BottomSheetComponent);
     this.postService.valor$.emit(valor); */
     //console.log(this.ratingControl3.value + " " + valor);
     if(valor === 'Mastografía'){
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
      this.calificaion = this.ratingControl.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     }else if(valor ==='Laboratorio'){
      this.currentRate = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
      this.calificaion = this.ratingControl1.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     } else if(valor === 'Ultrasonido'){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
      this.calificaion = this.ratingControl2.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     } else if(valor === 'Lentes'){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate4 = 0;
      this.currentRate5 = 0;
      this.calificaion = this.ratingControl3.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     } else if(valor === 'Electrocardiograma'){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate5 = 0;
      this.calificaion = this.ratingControl4.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     } else if(valor === 'Tomografía'){
      this.currentRate = 0;
      this.currentRate1 = 0;
      this.currentRate2 = 0;
      this.currentRate3 = 0;
      this.currentRate4 = 0;
      this.calificaion = this.ratingControl5.value + ' Estrellas';
      this.postService.addServicio(valor, this.calificaion);
     }

     Swal.fire({
      customClass: {
        confirmButton: 'swalBtnColor'
      },
      icon: 'success',
      text: 'Se a calificado el servicio correctamente!',
      buttonsStyling: true,
      timer: 1000,
      showConfirmButton: false
});

     this.postService.valor$.emit(valor);
  }
  ShowList(){
    //this.showlist= true;
    console.log(this.showlist);
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      300: {
        items: 3
      },
      500: {
        items: 4
      },

      1000: {
        items: 4
      }
    },
    nav: false
  }
}
