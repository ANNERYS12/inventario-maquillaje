import { Routes } from '@angular/router';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
  { path: 'registrar', component: RegistrarProductoComponent },
  { path: 'productos', component: ListarProductosComponent },
];