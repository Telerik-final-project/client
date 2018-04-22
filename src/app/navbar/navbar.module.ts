import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [NavbarComponent],
})
export class NavbarModule { }
