import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'eco-rating-stars',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent implements OnChanges {
  /** Numeric rating value, e.g. 4.3 (0–5 scale) */
  @Input() rating = 0;
  /** Total number of reviews to display alongside the stars */
  @Input() reviewCount: number | null = null;
  /** Maximum number of stars (default: 5) */
  @Input() max = 5;
  /** Size variant: 'sm' | 'md' | 'lg' */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  stars: Array<'full' | 'half' | 'empty'> = [];

  ngOnChanges(): void {
    this.stars = this.buildStars();
  }

  private buildStars(): Array<'full' | 'half' | 'empty'> {
    const result: Array<'full' | 'half' | 'empty'> = [];
    for (let i = 1; i <= this.max; i++) {
      if (this.rating >= i) {
        result.push('full');
      } else if (this.rating >= i - 0.5) {
        result.push('half');
      } else {
        result.push('empty');
      }
    }
    return result;
  }
}
