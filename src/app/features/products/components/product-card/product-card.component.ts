import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Product } from '../../../../models/product.model';

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
  @Input() product?: Product;

  @Output() clicked = new EventEmitter<void>();

  isAddingToCart = false;
  private cartItemCount = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Subscribe to cart count to track current count
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
  
  onCardClick() {
    this.clicked.emit();
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();

    if (!this.authService.isLoggedIn()) {
      this.toastService.showInfo('Please log in to add items to cart');
      return;
    }

    if (!this.product?.productId) {
      this.toastService.showError('Invalid product');
      return;
    }

    this.isAddingToCart = true;

    this.cartService.addToCart(this.product.productId, 1).subscribe({
      next: () => {
        this.cartItemCount++;
        this.cartService.updateCartCount(this.cartItemCount);
        this.toastService.showSuccess('Added to cart successfully!');
        this.isAddingToCart = false;
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.toastService.showError('Failed to add item to cart');
        this.isAddingToCart = false;
      }
    });
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

