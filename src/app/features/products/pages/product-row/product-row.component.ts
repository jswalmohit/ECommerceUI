import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() productClicked = new EventEmitter<Product>();

  onClick(product: Product) {
    // emit the clicked product to parent components
    this.productClicked.emit(product);
  }
}
