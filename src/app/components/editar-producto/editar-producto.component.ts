import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent implements OnInit {
  id = 0;
  nombre = '';
  categoria = '';
  precio: number | null = null;
  stock: number | null = null;
  error = '';
  noEncontrado = false;
  actualizado = false;

  categorias = ['Rostro', 'Ojos', 'Labios', 'Uñas', 'Cuidado de la piel'];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const producto = this.productoService.obtenerPorId(this.id);
    if (!producto) {
      this.noEncontrado = true;
      return;
    }
    this.nombre = producto.nombre;
    this.categoria = producto.categoria;
    this.precio = producto.precio;
    this.stock = producto.stock;
  }

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

    this.productoService.actualizar({
      id: this.id,
      nombre: this.nombre.trim(),
      categoria: this.categoria,
      precio: this.precio,
      stock: this.stock
    });
    this.error = '';
    this.actualizado = true;
  }
}