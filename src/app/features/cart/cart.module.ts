import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  imports: [CommonModule, CartPageComponent, RouterModule.forChild([{ path: '', component: CartPageComponent }])]
})
export class CartModule {}
