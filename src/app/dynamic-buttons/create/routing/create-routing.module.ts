import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './create-routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class CreateRoutingModule { }
