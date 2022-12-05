import { Component } from "@angular/core";
import { PostService } from "../publicaciones/post.service";

// Aqui se crea un componente en este caso el header
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']

})

export class InfoComponent {

  constructor(public postsService: PostService) {
  }
  hideComponent: boolean = false;

  ngOnInit(){
    this.postsService.buttons$.subscribe ( bandera => {
      this.hideComponent = bandera;
  });
  }
}
