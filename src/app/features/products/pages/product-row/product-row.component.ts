import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from '../../../../models/product.model';
@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent]
})
export class ProductRowComponent {
  @Input() category!: string;
  @Input() products: Product[] = [];

  onClick(product: Product) {
    console.log('Clicked:', product.title);
  }
}
