import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LROUTES } from './login-routes';

@NgModule({
  imports: [RouterModule.forChild(LROUTES)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
