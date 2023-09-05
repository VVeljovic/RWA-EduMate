import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { UserInfoComponent } from './userPage/user-info/user-info.component';
import { LoginCardComponent } from './loginPage/login-card/login-card.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FrontPageComponent } from './front-page/front-page.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../app/store/reducers';
import { AuthEffects } from './store/auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/posts/post.effects';
import { CommentPopupComponent } from './components/comment-popup/comment-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatePostComponent,
    PostViewComponent,
    UserInfoComponent,
    LoginCardComponent,
    NavigationComponent,
    FrontPageComponent,
    CommentPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MdbCollapseModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects,PostEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
