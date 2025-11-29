import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductCardComponent implements OnInit {

  @Input() title = '';
  @Input() imageUrl = '';
  @Input() offer?: string;
  @Input() price?: string;

  @Output() clicked = new EventEmitter<void>();

  ngOnInit() {
  }
  
  onCardClick() {
    this.clicked.emit();
  }

  // fallback image for broken or missing URLs
  fallbackUrl = 'https://ik.imagekit.io/rkmart/RKMART/PRODUCTS/105.webp';

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && this.fallbackUrl) {
      img.src = this.fallbackUrl;
    }
  }
}
