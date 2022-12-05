import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualificationServiceComponent } from './publicaciones/qualification-/qualification-service.component';
import { FormCreateComponent } from './publicaciones/form-create/form-create.component';
import { PostFormComponent } from './publicaciones/post-form/post-form.component';
import { LoginFormComponent } from './login-services/login/login-form.component';
import { RegisterFormComponent } from './login-services/register/register-form.component';
import { AuthGuard } from './auth.guard';
import { OpinionFormComponent } from './publicaciones/opinion-form/opinion-form.component';


const routes: Routes = [
  //{path: 'create', component: FormCreateComponent},
  //{path: 'edit/:postId', component: FormCreateComponent},
  {path: '', component: LoginFormComponent},
  {path: 'Register', component: RegisterFormComponent},
  {path: 'Resultados', component: PostFormComponent, canActivate: [AuthGuard]},
  {path: 'Qualification', component: QualificationServiceComponent, canActivate: [AuthGuard]},
  {path: 'Cal/:postId', component: QualificationServiceComponent, canActivate: [AuthGuard]},
  {path: 'create', component: FormCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:postId', component: FormCreateComponent, canActivate: [AuthGuard]},
  {path: 'Opinion', component: OpinionFormComponent, canActivate: [AuthGuard]},
  {path: 'edRecomendacion/:postId', component: OpinionFormComponent, canActivate: [AuthGuard]}


  /* {path: 'create', component: PostCreateComponent},
  {path: 'edit/:postId', component: PostCreateComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
