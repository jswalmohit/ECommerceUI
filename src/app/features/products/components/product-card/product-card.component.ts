import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductCardComponent {

  @Input() title = '';
  @Input() imageUrl = '';
  @Input() offer?: string;
  @Input() price?: string;

  @Output() clicked = new EventEmitter<void>();

  onCardClick() {
    this.clicked.emit();
  }
}
