import { Component, OnInit } from "@angular/core";
import {  NgForm } from "@angular/forms";
import { PostService } from "../publicaciones/post.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



// Aqui se crea un componente en este caso el header
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})


export class HeaderComponent implements OnInit{

  constructor(private router: Router, private postService: PostService) {
  }


  ngOnInit(): void {

  }


  onSubmit(){
    //console.log(this.postsService.getPosts())
    //this.postsService.limiparCampos();
    //console.log(this.postsService.getPosts())
    //this.child.Reset();
   // window.open("https://www.salud-digna.org/", "_blank");


   window.open("http://localhost:4200","_self")
    this.postService.buttons$.emit(false);



  }

  inicio(){
    window.open("http://localhost:4200/Resultados","_self")
    this.postService.buttons$.emit(false);
  }


}
