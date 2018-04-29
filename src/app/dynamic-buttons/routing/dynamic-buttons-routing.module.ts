import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './dynamic-buttons-routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DynamicButtonsRoutingModule { }
