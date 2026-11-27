import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private clave = 'productos';

  obtenerTodos(): Producto[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }

  agregar(producto: Omit<Producto, 'id'>): void {
    const lista = this.obtenerTodos();
    const id = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1;
    lista.push({ id, ...producto });
    localStorage.setItem(this.clave, JSON.stringify(lista));
  }
}