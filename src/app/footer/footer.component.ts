import { Component, OnInit } from "@angular/core";
import {  NgForm } from "@angular/forms";
import { PostService } from "../publicaciones/post.service";

// Aqui se crea un componente en este caso el header
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']

})

export class FooterComponent implements OnInit{

  ngOnInit(): void {

  }

  onSubmitFacebook(){
    window.open("https://www.facebook.com/SaludDignaMx", "_blank");
  }

  onSubmitWhatsapp(){
    window.open("https://api.whatsapp.com/send/?phone=5215539566729&text=Hola,+Salud+Digna&app_absent=0", "_blank");
  }

  onSubmitYoutube(){
    window.open("https://www.youtube.com/c/SaludDignaM%C3%A9xico", "_blank");
  }

  onSubmitInstagram(){
    window.open("https://www.instagram.com/saluddigna_mx/", "_blank");
  }

}
