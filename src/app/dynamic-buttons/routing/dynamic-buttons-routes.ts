import { Routes } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/editcomponent';
import { ListingComponent } from '../listing/listing.component';

export const ROUTES: Routes = [
    { path: '', component: ListingComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit', component: EditComponent },
];
