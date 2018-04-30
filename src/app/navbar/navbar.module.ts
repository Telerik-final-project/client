import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedIconModule } from './../shared/material/shared-icon.module';
import { SharedModule } from './../shared/shared.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedIconModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})

export class NavbarModule { }
