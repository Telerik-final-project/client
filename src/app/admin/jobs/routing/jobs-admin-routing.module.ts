import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './jobs-admin-routes';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
  ],
  exports: [RouterModule],
})
export class JobsAdminRoutingModule { }
