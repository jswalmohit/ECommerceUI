import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductRowComponent } from '../product-row/product-row.component';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductRowComponent],
  template: `
    <div *ngFor="let category of categories">
      <app-product-row [category]="category" [products]="groupedProducts[category]"></app-product-row>
    </div>
  `,
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  groupedProducts: { [category: string]: Product[] } = {};
  categories: string[] = [];
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.groupedProducts = this.groupByCategory(products);
      this.categories = Object.keys(this.groupedProducts);
    });
  }

  groupByCategory(products: Product[]): { [category: string]: Product[] } {
    return products.reduce((acc, product) => {
      if (!product.category) return acc;
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {} as { [category: string]: Product[] });
  }
}
