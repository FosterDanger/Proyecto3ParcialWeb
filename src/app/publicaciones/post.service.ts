import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { datosCliente } from "./post.model";
import { cliente } from "./post.model";
import { servicio } from "./post.model";
import { recomendacion } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map} from 'rxjs/operators'


@Injectable({providedIn: 'root'})
export class PostService{
  public isOn: boolean = false;
  public clienteBandera: boolean = false;
  public datos: datosCliente[] = []; //Primera matriz
  public recomendacionArr: recomendacion[] = [];
  public Cliente: cliente[] = [];
  public servicio: servicio[] =[];
  private postsUpdate = new Subject<datosCliente[]>();
  private clienteUpdate = new Subject<cliente[]>();
constructor(private http: HttpClient){}


  getPosts(){
    this.http.get<{message: string, datos: any}>('http://localhost:3000/api.posts')
    .pipe(map((postData) => {
        return postData.datos.map(post => {
          console.log(post);
          return{
          id: post._id,
          nombre: post.nombre,
          estado: post.estado,
          ciudad: post.ciudad,
          sucursal: post.sucursal,
          servicio: post.servicio,
          calificacionServicio: post.calificacionServicio,
          recomendacion: post.recomendacion
          };
        });
    })).subscribe((transformedPost)=>{
     this.datos = transformedPost;
      this.postsUpdate.next([...this.datos]);
    });
  }

  ocultarButtons$ = new EventEmitter<boolean>();
  clienteButtons$ = new EventEmitter<boolean>();
  validarButtons$ = new EventEmitter<boolean>();
  buttonsOpinion$ = new EventEmitter<boolean>();
  buttons$ = new EventEmitter<boolean>();
  urlEdit$ = new EventEmitter<string>();
  valor$ = new EventEmitter<number>();


  getPostsUpdateListener(){
    return this.postsUpdate.asObservable();
  }

  getPost(id: string){
    //return {...this.posts.find(p => p.id === id)}
    return this.http.get<{_id: string, nombre: string, estado: string,
    ciudad: string, sucursal: string,servicio: string, calificacionServicio: string,
   recomendacion: string}>('http://localhost:3000/api.posts/' + id);
  }

  addPost(nombre: string, estado: string, ciudad: string, sucursal: string, servicio: string, calificacionServicio: string, recomendacion: string){
    const dato: datosCliente = {id: null, nombre: nombre , estado: estado,ciudad:ciudad, sucursal:sucursal,servicio: servicio,calificacionServicio: calificacionServicio,
    recomendacion: recomendacion};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api.posts', dato)
    .subscribe((responseData) =>{
      //console.log(responseData.message);
      const id = responseData.postId;
      dato.id = id;
      this.datos.push(dato);
      this.postsUpdate.next([...this.datos]);
    });

  }

  addClient(nombre: string, estado: string, ciudad: string, sucursal: string){
    const dato = {nombre: nombre , estado: estado,ciudad:ciudad, sucursal:sucursal};
    this.Cliente.push(dato);
   // this.clienteUpdate.next([...this.Cliente]);
  }

  addRecomendacion(recomendacion: string){
    const Recomendacion = {recomendacion: recomendacion};
    this.recomendacionArr.push(Recomendacion);
  }

  addServicio(servicio: string , calificacionServicio: string,){
    const dato = {servicio: servicio, calificacionServicio: calificacionServicio};
    this.servicio.push(dato);
  }



  updatePost(id: string,nombre: string, estado: string, ciudad: string, sucursal: string, servicio: string, calificacionServicio: string, recomendacion: string){
    const dato: datosCliente = {id: id, nombre: nombre , estado: estado,ciudad:ciudad, sucursal:sucursal,servicio: servicio,calificacionServicio: calificacionServicio,
      recomendacion: recomendacion};
    this.http.put("http://localhost:3000/api.posts/" + id, dato).
    subscribe(response => {
      const updatePost = [...this.datos];
      const oldPostIndex = updatePost.findIndex(p => p.id === dato.id);
      updatePost[oldPostIndex] = dato;
      this.datos = updatePost;
      this.postsUpdate.next([...this.datos]);

  });
}

deletePost(postId: string){
  this.http.delete("http://localhost:3000/api.posts/" + postId)
  .subscribe(()=>{
    const updatePost = this.datos.filter(dato => dato.id !== postId);
    this.datos = updatePost;
    this.postsUpdate.next([...this.datos]);
  })
}


  /* limiparCampos(){
   // this.datos = [];
    this.postsUpdate.next([...this.datos]);
  } */

  public myData: boolean = false;

}

