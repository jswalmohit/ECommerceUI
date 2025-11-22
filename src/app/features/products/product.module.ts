import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ProductListComponent }])]
})
export class ProductModule {}
