import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './userPage/user-info/user-info.component';
import { LoginCardComponent } from './loginPage/login-card/login-card.component';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { CommentPopupComponent } from './components/comment-popup/comment-popup.component';

const routes: Routes = [
{ path:'',component:FrontPageComponent,},
{path:'login',component:LoginCardComponent},
{path:'signUp',component:LoginCardComponent},
{path:'user/:userId',component:UserInfoComponent},
{path:'comments',component:CommentPopupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
