import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {routings} from './app.routing';
import { RegisterComponent } from './register/register.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  
  ],
  imports: [
    BrowserModule,
    routings
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
