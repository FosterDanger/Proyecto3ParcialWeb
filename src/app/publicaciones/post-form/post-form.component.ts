import { Component,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { datosCliente } from "../post.model";
import { PostService } from "../post.service";
import {OnDestroy} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  /* posts = [
    {title: "Primer post", content: "Este es el contenido del primer post"},
    {title: "Segundo post", content: "Este es el contenido del segundo post"},
    {title: "Tercer post", content: "Este es el contenido del tercer post"}
  ] */

  public load: boolean;

  datos: datosCliente[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostService, public route: Router) {
    this.load = false;
  }

  ngOnInit() {
    setTimeout(() => {
      this.load = true;
    }, 200);
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((datos: datosCliente[]) => {
        this.datos = datos;
      });

    //this.postsService.ocultarButtons$.emit(false);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    //this.formCreate.onAddPost();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  EnviarID(id: string) {
    this.postsService.urlEdit$.emit(id);
    this.postsService.ocultarButtons$.emit(true);
    this.postsService.buttons$.emit(true);
    this.route.navigate(['/edit', id]);
  }

  NuevaEncuesta() {
    this.route.navigate(['/create']);
    this.postsService.ocultarButtons$.emit(true);
    this.postsService.validarButtons$.emit(false);
    this.postsService.buttons$.emit(true);
  }
}


