import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {
  toast: ToastMessage | null = null;

  constructor(private toastService: ToastService) {
    console.log('ToastComponent constructor called');
  }

  ngOnInit(): void {
    console.log('ToastComponent ngOnInit called');
    this.toastService.toast$.subscribe((toast: ToastMessage | null) => {
      console.log('Toast subscription received:', toast);
      this.toast = toast;
    });
  }
}

