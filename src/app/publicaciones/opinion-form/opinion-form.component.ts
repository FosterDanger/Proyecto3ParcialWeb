import { Component, Input, OnInit,ViewChild } from "@angular/core";
import { FormBuilder, NgForm, NgModel } from "@angular/forms";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { datosCliente } from "../post.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import Swal from 'sweetalert2';
import {OnDestroy} from "@angular/core";
import { style } from "@angular/animations";
import { FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-opinion-create',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css'],
})
export class OpinionFormComponent implements OnInit {
  constructor(
    public postsService: PostService,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  form: FormGroup;
  bandera: boolean = true;
  private mode = 'Opnion';
  private postId: string;
  post: datosCliente;
  recomendacion: string;

  ngOnInit() {
    this.form = new FormGroup({
      Recomendacion: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(0)],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edRecomendacion';
        this.postId = paramMap.get('postId');
        //this.post = this.postsService.getPost(this.postId);
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            nombre: postData.nombre,
            estado: postData.estado,
            ciudad: postData.ciudad,
            sucursal: postData.sucursal,
            servicio: postData.servicio,
            calificacionServicio: postData.calificacionServicio,
            recomendacion: postData.recomendacion,
          };
          this.postsService.urlEdit$.emit(postData._id);
          //this.recomendacion= postData.recomendacion;
          this.form.setValue({ Recomendacion: postData.recomendacion });

        });
      } else {
        this.mode = 'Opinion';
        this.postId = null;
      }
    });

    this.postsService.buttonsOpinion$.subscribe((bandera) => {
      this.bandera = bandera;
      if (this.bandera === true) {
        this.postsService.recomendacionArr = [];
        if (!this.form.invalid && this.form.value.Recomendacion !== null) {
          this.postsService.validarButtons$.emit(true);
          this.postsService.recomendacionArr = [];
          this.postsService.addRecomendacion(this.form.value.Recomendacion);
        } else {
          Swal.fire({
            customClass: {
              confirmButton: 'swalBtnColor',
            },
            icon: 'warning',
            text: 'Por favor ingresa una recomendacion!',
            confirmButtonColor: '#01AD49',
            buttonsStyling: true,
          });
        }
      }
    });
  }
}
