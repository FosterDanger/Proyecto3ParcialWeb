import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { datosCliente } from "../post.model";

@Component({
  selector: 'app-form-create',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})


export class BottomSheetComponent implements OnInit{
  constructor(private bottomSheet: MatBottomSheetRef<BottomSheetComponent>, public postService: PostService, public route: ActivatedRoute) {}
valor: number = 0;
private mode = 'Qualification';
private postId: string;
post: datosCliente;
servicio: string;



  openLink(event: MouseEvent, opcion: string): void {
     this.postService.servicio = [];
    this.bottomSheet.dismiss();
      event.preventDefault();

      console.log(this.servicio, opcion)
        this.postService.addServicio(this.servicio,opcion);




  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'editCal';;
        this.postId = paramMap.get('postId');
        //this.post = this.postsService.getPost(this.postId);
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData._id, nombre: postData.nombre,estado: postData.estado, ciudad: postData.ciudad
          ,sucursal: postData.sucursal, servicio: postData.servicio, calificacionServicio: postData.calificacionServicio
        ,recomendacion: postData.recomendacion}
        this.servicio = postData.servicio;
        });
      }else{
        this.mode = 'Qualification';
        this.postId = null;
      }
    })




    this.postService.valor$.subscribe ( valor => {

     this.valor = valor;
      if(valor == 1){
        this.servicio = "Mastografía"

      }else if(valor == 2){
        this.servicio = "Laboratorio"
      }else if(valor == 3){
          this.servicio = "Ultrasonido"
      }else if(valor == 4){
          this.servicio = "Lentes"
      }else if(valor == 5){
          this.servicio = "Electrocardiograma"
      }else if(valor == 6){
          this.servicio = "Tomografía"
      }
    });

}
}
