import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LROUTES } from '../login/routing/login-routes';
import { RROUTES } from '../register/routing/register-routes';

@NgModule({
  imports: [
    RouterModule.forChild(LROUTES),
    RouterModule.forChild(RROUTES),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
