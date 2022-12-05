import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map} from 'rxjs/operators'
import { dataLogin } from "./login.model";
import Swal from 'sweetalert2';



@Injectable({providedIn: 'root'})
export class LoginService{
  constructor(private http: HttpClient){}
  public datos: dataLogin[] = []; //Primera matriz
   private dataLoginUpdate = new Subject<dataLogin[]>();
   private loginUpdate = new Subject<dataLogin[]>();

   getPostsUpdateListener(){
    return this.dataLoginUpdate.asObservable();
  }

   getPosts(){
    this.http.get<{message: string, datos: any}>('http://localhost:3000/api.posts/Login')
    .pipe(map((postData) => {
        return postData.datos.map(post => {
          console.log(post);
          return{
          id: post._id,
          usuario: post.usuario,
          email: post.email,
          contraseña: post.contraseña
          };
        });
    })).subscribe((transformedPost)=>{
     this.datos = transformedPost;
      this.loginUpdate.next([...this.datos]);
    });
  }

  addPost(usuario: string, email: string, contraseña: string){
    const dato: dataLogin = {id: null, usuario: usuario , email: email, contraseña: contraseña};
 return this.http.post<{message: string, postId: string}>('http://localhost:3000/api.posts/Register', dato);
    /* .subscribe((responseData) =>{
      //console.log(responseData.message);

      const id = responseData.postId;
      dato.id = id;
      this.datos.push(dato);
      this.loginUpdate.next([...this.datos]);
    }); */

  }

  entrar(user){
      return this.http.post<any>("http://localhost:3000/api.posts/Login", user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
