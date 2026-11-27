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
  categoria = 'Rostro';
  precio = 0;
  stock = 0;
  mensaje = '';

  categorias = ['Rostro', 'Ojos', 'Labios', 'Uñas', 'Cuidado de la piel'];

  constructor(private productoService: ProductoService) {}

  guardar(): void {
    if (!this.nombre.trim() || this.precio < 0 || this.stock < 0) {
      this.mensaje = 'Revisa los datos: el nombre es obligatorio y los números no pueden ser negativos.';
      return;
    }
    this.productoService.agregar({
      nombre: this.nombre.trim(),
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock
    });
    this.mensaje = 'Producto registrado correctamente.';
    this.nombre = '';
    this.precio = 0;
    this.stock = 0;
  }
} 