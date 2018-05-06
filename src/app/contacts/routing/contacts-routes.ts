import { Routes } from '@angular/router';
import { ContactsComponent } from '../contacts.component';

export const ROUTES: Routes = [
  { path: '', component: ContactsComponent, pathMatch: 'full' },
];
