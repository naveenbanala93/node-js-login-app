import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'

export const routes: Routes = [
 {path:'',
 children:[
     {path:'login',component:LoginComponent}]
    }
];
        
export const routings: ModuleWithProviders = RouterModule.forRoot(routes);