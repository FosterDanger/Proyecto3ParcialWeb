import { Component, Input, OnInit,ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, NgModel } from "@angular/forms";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { datosCliente } from "../post.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import Swal from 'sweetalert2';
import {OnDestroy} from "@angular/core";
import { style } from "@angular/animations";

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css'],
})
export class FormCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  bandera: boolean = false;
  private mode = 'create';
  private postId: string;
  post: datosCliente;
  selected: string;

  selectedSucursal: string;
  formgroup: FormGroup;

  constructor(public postsService: PostService, public route: ActivatedRoute) {}

  @ViewChild('postForm') public postForm: NgForm;
  // private postsSub: Subscription;
  estados: any[] = [
    { id: 1, nombre: 'Guanajuato' },
    { id: 2, nombre: 'Mexico' },
    { id: 3, nombre: 'Distrito Federal' },
    { id: 4, nombre: 'Jalisco' },
  ];

  ciudades = [];

  ciudadesSeleccion = {
    Guanajuato: ['Leon', 'San Francisco del Rincon'],
    Mexico: ['Ecatepec', 'Toluca'],
    'Distrito Federal': ['Polanco', 'Chapultepec'],
    Jalisco: ['Guadalajara', 'Puerto Vallarta'],
  };

  sucursales = [];

  sucursalesSeleccion = {
    Leon: ['Sucursal del Valle', 'Sucursal Torres Landa'],
    'San Francisco del Rincon': [
      'Sucursal Juventino Rosas',
      'Sucursal Aquiles Serdan',
    ],
    Ecatepec: ['Sucursal San Cristobal', 'Sucursal Fracc. Las Americas'],
    Toluca: ['Sucursal Las Palmas', 'Sucursal Paque Industrial'],
    Polanco: ['Sucursal Dias Miron', 'Sucursal Benito Juarez'],
    Chapultepec: ['Sucursal Parque Chapultepec', 'Sucursal Zaragoza'],
    Guadalajara: ['Sucursal Jalisco', 'Sucursal Zapopan'],
    'Puerto Vallarta': ['Sucursal Emiliano Zapata', 'Sucursal Versalles'],
  };

  cambioCiudad() {
    this.sucursales = this.sucursalesSeleccion[this.selectedSucursal];
  }

  cambioRegion() {
    //Aqui va tu logica de consulta a la BD
    this.ciudades = this.ciudadesSeleccion[this.selected];
    this.sucursales = [];
  }

  mensaje: string = '';
  onAddPost(form: NgForm) {
    if (form.invalid || form.value.nombre == '') {
      return;
    }
  }

  ngOnInit() {
    /* this.postsSub = this.postsService.getPostsUpdateListener()
    .subscribe(() =>{
      //this.mytemplateForm.resetForm();
    }); */
    //this.selected = "Mexico";
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
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
          this.ciudades = this.ciudadesSeleccion[postData.estado];
          this.sucursales = this.sucursalesSeleccion[postData.ciudad];
          this.postsService.urlEdit$.emit(postData._id);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

    this.postsService.clienteButtons$.subscribe((bandera) => {
      this.bandera = bandera;
      if (this.bandera === true) {
        if (
          !this.postForm.invalid ||
          (this.postForm.value.estado != undefined &&
            this.postForm.value.ciudad != undefined &&
            this.postForm.value.nombre != '' &&
            this.postForm.value.sucursal != undefined)
        ) {
          this.postsService.validarButtons$.emit(true);
          this.postsService.Cliente = [];
          this.postsService.addClient(
            this.postForm.value.nombre,
            this.postForm.value.estado,
            this.postForm.value.ciudad,
            this.postForm.value.sucursal
          );
        } else {
          this.postsService.validarButtons$.emit(false);
          Swal.fire({
            customClass: {
              confirmButton: 'swalBtnColor',
            },
            icon: 'warning',
            text: 'Por favor ingresa todos los datos!',
            confirmButtonColor: '#01AD49',
            buttonsStyling: true,
          });
        }
      }
    });
  }
}
