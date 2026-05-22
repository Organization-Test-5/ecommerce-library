import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eco-button',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Button style variant: 'primary' | 'secondary' | 'danger' | 'ghost' */
  @Input() variant: ButtonVariant = 'primary';
  /** Size variant: 'sm' | 'md' | 'lg' */
  @Input() size: ButtonSize = 'md';
  /** Button text or label */
  @Input() label = '';
  /** Whether the button is disabled */
  @Input() disabled = false;
  /** Whether the button is in a loading state */
  @Input() loading = false;
  /** HTML button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  /** Optional ARIA label for accessibility */
  @Input() ariaLabel = '';

  /** Emitted when the button is clicked */
  @Output() buttonClick = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}
