import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eco-category-pill',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './category-pill.component.html',
  styleUrls: ['./category-pill.component.scss'],
})
export class CategoryPillComponent {
  @Input() label = '';
  @Input() active = false;
  @Input() emoji = '';

  @Output() pillClick = new EventEmitter<string>();

  onClick(): void {
    this.pillClick.emit(this.label);
  }
}
