import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast"
         class="toast"
         [class.error]="toast.type === 'error'"
         [class.success]="toast.type === 'success'">
      {{ toast.message }}
    </div>
  `,
styles: [`
  .toast {
    position: fixed;
    bottom: 20px;          /* 👈 Bottom */
    right: 20px;           /* 👈 Right */
    padding: 12px 18px;
    border-radius: 6px;
    color: #fff;
    font-weight: 500;
    z-index: 9999;
    min-width: 250px;
    animation: slideIn 0.4s ease, fadeOut 3s ease 0.5s forwards;
  }

  .error { background: #e74c3c; }
  .success { background: #2ecc71; }
  .info { background: #3498db; }
  .warning { background: #f1c40f; color: #000; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeOut {
    0%   { opacity: 1; }
    100% { opacity: 0; transform: translateX(50px); }
  }
`]

})
export class ToastComponent {}
