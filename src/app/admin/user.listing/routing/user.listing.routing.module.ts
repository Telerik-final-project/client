import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './user.listing.routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class UsersListingRoutingModule { }
