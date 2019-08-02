import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ErrorRoutingModule
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class ErrorModule { }
