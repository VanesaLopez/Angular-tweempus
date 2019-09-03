import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class LoginModule { }
