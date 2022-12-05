
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FormCreateComponent } from './publicaciones/form-create/form-create.component';
import { PostFormComponent } from './publicaciones/post-form/post-form.component';
import { OpinionFormComponent } from './publicaciones/opinion-form/opinion-form.component';
import { MoveButtonsComponent } from './MoveButtons/MoveButtons.component';
import { InfoComponent } from './Info/info.component';
import { NgModule} from '@angular/core';
import { LoginFormComponent } from './login-services/login/login-form.component';
import { RegisterFormComponent } from './login-services/register/register-form.component';
import { BottomSheetComponent } from './publicaciones/bottom-sheet/bottom-sheet.component';
import { TokenInterceptorService } from './login-services/token-interceptor.service';
import { AuthGuard } from './auth.guard';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatSelectModule} from '@angular/material/select'
import { FormsModule } from '@angular/forms';
import { PostService } from './publicaciones/post.service';
import { LoginService } from './login-services/login.service';
import { MatStepperModule} from '@angular/material/stepper'
import { MatDividerModule} from '@angular/material/divider'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { QualificationServiceComponent } from './publicaciones/qualification-/qualification-service.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormCreateComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PostFormComponent,
    InfoComponent,
    MoveButtonsComponent,
    BottomSheetComponent,
    QualificationServiceComponent,
    FooterComponent,
    OpinionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatStepperModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatListModule,
    HttpClientModule,
    CarouselModule,
    MatProgressSpinnerModule,
    NgbModule

  ],
  providers: [
    AuthGuard,
    PostService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]

})
export class AppModule { }
