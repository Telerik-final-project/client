import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RROUTES } from './register-routes';

@NgModule({
  imports: [RouterModule.forChild(RROUTES)],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }
