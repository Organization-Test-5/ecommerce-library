import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eco-search-bar',
  standalone: true,
  imports: [CommonModule],
  // Emulated encapsulation: styles are scoped to this component only,
  // preventing any global CSS rule from overriding the SVG size.
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .search-wrapper {
      position: relative;
      width: 100%;
    }

    /* Icon container: fixed 16x16, vertically centered via transform */
    .search-icon {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: #6C7A89;
      /* Prevent any inherited flex/grid stretching */
      flex-shrink: 0;
      flex-grow: 0;
    }

    /* Double-lock the SVG size: CSS + HTML attributes both enforce 16x16 */
    .search-icon svg {
      display: block;
      width: 16px;
      height: 16px;
      min-width: 16px;
      min-height: 16px;
      max-width: 16px;
      max-height: 16px;
    }

    .search-input {
      display: block;
      width: 100%;
      padding: 10px 16px 10px 44px;
      border-radius: 9999px;
      background-color: #E9ECEF;
      border: 2px solid transparent;
      font-size: 14px;
      color: #1A1D20;
      outline: none;
      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: #6C7A89;
    }

    .search-input:focus {
      background-color: #ffffff;
      border-color: #0066FF;
      box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.08);
    }
  `],
  template: `
    <div class="search-wrapper">
      <!-- Icon: width/height attributes lock the SVG at 16×16 at the browser level,
           independent of any CSS cascade. This is the primary size guard. -->
      <span class="search-icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="6"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input
        type="text"
        class="search-input"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
    </div>
  `,
})
export class SearchBarComponent {
  @Input() placeholder = 'Search restaurants, cuisines...';
  @Input() value = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.searchChange.emit(this.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}
