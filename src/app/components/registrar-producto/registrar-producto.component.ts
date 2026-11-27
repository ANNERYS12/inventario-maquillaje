import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-registrar-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './registrar-producto.component.html'
})
export class RegistrarProductoComponent {
  nombre = '';
  categoria = '';
  precio: number | null = null;
  stock: number | null = null;
  error = '';

  registrado: Producto | null = null;
  total = 0;

  categorias = ['Rostro', 'Ojos', 'Labios', 'Uñas', 'Cuidado de la piel'];

  constructor(private productoService: ProductoService) {}

  seleccionar(c: string): void {
    this.categoria = c;
  }

  guardar(): void {
    if (
      !this.nombre.trim() ||
      !this.categoria ||
      this.precio === null || this.precio < 0 ||
      this.stock === null || this.stock < 0
    ) {
      this.error = 'Completa todos los campos. El precio y el stock no pueden ser negativos.';
      return;
    }

    this.registrado = this.productoService.agregar({
      nombre: this.nombre.trim(),
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock
    });
    this.total = this.productoService.obtenerTodos().length;
    this.error = '';
  }

  nuevoRegistro(): void {
    this.nombre = '';
    this.categoria = '';
    this.precio = null;
    this.stock = null;
    this.error = '';
    this.registrado = null;
  }
}