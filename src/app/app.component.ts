import { Component, OnInit } from '@angular/core';
import { PostService } from './publicaciones/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selected: string;
  constructor(public postsService: PostService){}
  isOn: boolean = true;
  ngOnInit(){
    this.postsService.ocultarButtons$.subscribe ( bandera => {
        this.isOn = bandera;
    });
  }


}
