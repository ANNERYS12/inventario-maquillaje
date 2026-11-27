import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-registrar-producto',
  imports: [FormsModule],
  templateUrl: './registrar-producto.component.html'
})
export class RegistrarProductoComponent {
  nombre = '';
  categoria = '';
  precio: number | null = null;
  stock: number | null = null;
  mensaje = '';
  error = false;

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
      this.mensaje = 'Completa todos los campos. El precio y el stock no pueden ser negativos.';
      this.error = true;
      return;
    }

    this.productoService.agregar({
      nombre: this.nombre.trim(),
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock
    });

    this.mensaje = 'Producto registrado correctamente.';
    this.error = false;
    this.nombre = '';
    this.categoria = '';
    this.precio = null;
    this.stock = null;
  }
}