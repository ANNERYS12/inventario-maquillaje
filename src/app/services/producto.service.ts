import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private clave = 'productos';

  obtenerTodos(): Producto[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.obtenerTodos().find(p => p.id === id);
  }

  agregar(producto: Omit<Producto, 'id'>): Producto {
    const lista = this.obtenerTodos();
    const id = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1;
    const nuevo: Producto = { id, ...producto };
    lista.push(nuevo);
    localStorage.setItem(this.clave, JSON.stringify(lista));
    return nuevo;
  }

  actualizar(producto: Producto): void {
    const lista = this.obtenerTodos().map(p => (p.id === producto.id ? producto : p));
    localStorage.setItem(this.clave, JSON.stringify(lista));
  }

  eliminar(id: number): void {
    const lista = this.obtenerTodos().filter(p => p.id !== id);
    localStorage.setItem(this.clave, JSON.stringify(lista));
  }
}