import { Routes } from '@angular/router';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarProductoComponent },
];