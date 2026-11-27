import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-listar-productos',
  imports: [FormsModule],
  templateUrl: './listar-productos.component.html'
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];
  textoBusqueda = '';
  categoriaFiltro = 'Todas';

  categorias = ['Todas', 'Rostro', 'Ojos', 'Labios', 'Uñas', 'Cuidado de la piel'];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productos = this.productoService.obtenerTodos();
  }

  filtrar(c: string): void {
    this.categoriaFiltro = c;
  }

  eliminar(p: Producto): void {
    if (confirm(`¿Seguro que quieres eliminar "${p.nombre}"?`)) {
      this.productoService.eliminar(p.id);
      this.productos = this.productoService.obtenerTodos();
    }
  }

  get productosFiltrados(): Producto[] {
    const texto = this.textoBusqueda.trim().toLowerCase();
    return this.productos.filter(p =>
      (p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto)) &&
      (this.categoriaFiltro === 'Todas' || p.categoria === this.categoriaFiltro)
    );
  }
}