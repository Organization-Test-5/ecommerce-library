import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eco-input',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  /** Input type (text, email, password, number, tel, url) */
  @Input() type: InputType = 'text';
  /** Current value of the input */
  @Input() value = '';
  /** Placeholder text */
  @Input() placeholder = '';
  /** Label displayed above the input */
  @Input() label = '';
  /** Helper text displayed below the input */
  @Input() hint = '';
  /** Error message — when set, the input enters error state */
  @Input() error = '';
  /** Size variant: 'sm' | 'md' | 'lg' */
  @Input() size: InputSize = 'md';
  /** Whether the input is disabled */
  @Input() disabled = false;
  /** Whether the input is read-only */
  @Input() readonly = false;
  /** Whether the field is required */
  @Input() required = false;

  /** Emitted on every keystroke with the new value */
  @Output() valueChange = new EventEmitter<string>();
  /** Emitted when the input gains focus */
  @Output() focused = new EventEmitter<void>();
  /** Emitted when the input loses focus */
  @Output() blurred = new EventEmitter<void>();

  get hasError(): boolean {
    return this.error.trim().length > 0;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
