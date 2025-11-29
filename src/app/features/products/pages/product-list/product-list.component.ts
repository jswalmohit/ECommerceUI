import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductRowComponent } from '../product-row/product-row.component';
import { Product } from '../../../../models/product.model';
import { environment } from '../../../../../environments/environment';

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
      // ensure each product has an imageUrl built from environment if missing
      this.buildImageUrl(this.products);
      this.groupedProducts = this.groupByCategory(this.products);
      this.categories = Object.keys(this.groupedProducts);
    });
  }

  buildImageUrl(products: Product[]) {
     this.products = products.map(p => ({
        ...p,
        imageUrl:  `${environment.imageBaseUrl}/${p.productId ?? p.title}.webp`
      }));
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
