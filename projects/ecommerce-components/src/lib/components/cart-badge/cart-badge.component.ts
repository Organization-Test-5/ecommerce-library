import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eco-cart-badge',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss'],
})
export class CartBadgeComponent {
  /** Number of items currently in the cart */
  @Input() count = 0;
  /** Maximum count to display before showing a "+" suffix (e.g. 99+) */
  @Input() maxCount = 99;
  /** Size variant: 'sm' | 'md' | 'lg' */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  /** Whether the button is disabled */
  @Input() disabled = false;

  /** Emitted when the user clicks the cart button */
  @Output() cartClick = new EventEmitter<void>();

  get displayCount(): string {
    if (this.count <= 0) return '';
    return this.count > this.maxCount ? `${this.maxCount}+` : `${this.count}`;
  }

  get hasItems(): boolean {
    return this.count > 0;
  }

  onClick(): void {
    if (!this.disabled) {
      this.cartClick.emit();
    }
  }
}
