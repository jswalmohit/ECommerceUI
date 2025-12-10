import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // products: Product[] = [];
  // loading = true;
  // error: string | null = null;  
  // groupedProducts: { [category: string]: Product[] } = {};
  // productService = inject(ProductService);

  // constructor(private route: ActivatedRoute) {}

  //   ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (!id) {
  //     this.error = 'Invalid product';
  //     this.loading = false;
  //     return;
  //   }

  //   this.productService.getProducts().subscribe( products => {

  //        this.products = products;
  //     // ensure each product has an imageUrl built from environment if missing
  //     this.buildImageUrl(this.products);
  //     this.groupedProducts = this.groupByCategory(this.products);
  //     this.categories = Object.keys(this.groupedProducts);
  //   });
  //   }
  // buildImageUrl(products: Product[]) {
  //   this.products = products.map(p => ({
  //     ...p,
  //     imageUrl:  `${environment.imageBaseUrl}/${p.productId ?? p.title}.webp`
  //   }));
  // }

  // groupByCategory(products: Product[]): { [category: string]: Product[] } {
  //   return products.reduce((acc, product) => {
  //     if (!product.category) return acc;
  //     if (!acc[product.category]) acc[product.category] = [];
  //     acc[product.category].push(product);
  //     return acc;
  //   }, {} as { [category: string]: Product[] });
  // }
  //   //   next: (product) => {
  //   //     this.product = product;
  //   //     this.loading = false;
  //   //   },
  //   //   error: (err) => {
  //   //     this.error = 'Failed to load product';
  //   //     this.loading = false;
  //   //   }
  //   // });

  //    this.productService.getById(id).subscribe({
  //     next: p => { this.product = p; this.loading = false; },
  //     error: err => { this.error = 'Failed to load product'; this.loading = false; }
  //   });
  // }

   product: Product | null = null;
  loading = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid product id';
      this.loading = false;
      return;
    }

    // Use getById — expects Observable<Product | null>
    this.productService.getById(id).subscribe({
      next: (p) => {
        if (!p) {
          this.error = 'Product not found';
        } else {
          this.product = this.ensureImageUrl(p);
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load product';
        console.error('Product load error', err);
        this.loading = false;
      }
    });
  }

  private ensureImageUrl(p: Product): Product {
    if (!p.imageUrl) {
      return {
        ...p,
        imageUrl: `${environment.imageBaseUrl}/${p.productId ?? p.title}.webp`
      };
    }
    return p;
  }
}
