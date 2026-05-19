import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  discount?: number;
  tags?: string[];
  category?: string;
}

@Component({
  selector: 'eco-restaurant-card',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .eco-card {
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #E9ECEF;
      box-shadow: 0 4px 12px rgba(0, 102, 255, 0.03);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .eco-card:hover {
      box-shadow: 0 4px 16px rgba(0, 102, 255, 0.12);
      transform: translateY(-2px);
    }
    .eco-card-image-container {
      position: relative;
      width: 100%;
      height: 11rem;
      background-color: #E9ECEF;
      overflow: hidden;
    }
    .eco-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .eco-card-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
      pointer-events: none;
    }
    .eco-card-discount-badge {
      position: absolute;
      top: 0.625rem;
      left: 0.625rem;
      background-color: #FF2D55;
      color: #ffffff;
      font-size: 10px;
      font-weight: 900;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .eco-card-category-badge {
      position: absolute;
      bottom: 0.625rem;
      left: 0.625rem;
      background-color: rgba(0,0,0,0.4);
      color: #ffffff;
      font-size: 10px;
      font-weight: 600;
      padding: 0.125rem 0.5rem;
      border-radius: 6px;
    }
    .eco-card-body {
      padding: 0.75rem;
    }
    .eco-card-name {
      font-size: 13px;
      font-weight: 700;
      color: #1A1D20;
      line-height: 1.3;
      margin: 0 0 0.375rem 0;
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .eco-card-meta {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 11px;
      color: #6C7A89;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .eco-card-rating {
      display: flex;
      align-items: center;
      gap: 0.125rem;
    }
    .eco-card-rating-star {
      color: #FBBF24;
      font-size: 12px;
    }
    .eco-card-rating-value {
      color: #1A1D20;
      font-weight: 600;
    }
    .eco-card-separator {
      color: #E9ECEF;
    }
    .eco-card-fee-free {
      color: #0066FF;
      font-weight: 600;
    }
    .eco-card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
    .eco-card-tag {
      display: inline-block;
      background-color: rgba(0, 102, 255, 0.08);
      color: #0066FF;
      font-size: 10px;
      font-weight: 700;
      padding: 0.125rem 0.5rem;
      border-radius: 6px;
      letter-spacing: 0.03em;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
  `],
  template: `
    <div class="eco-card">
      <div class="eco-card-image-container">
        <img
          [src]="restaurant.image"
          [alt]="restaurant.name"
          class="eco-card-image"
          loading="lazy"
        />
        <div class="eco-card-gradient"></div>
        <div *ngIf="restaurant.discount" class="eco-card-discount-badge">
          {{ restaurant.discount }}% OFF
        </div>
        <div *ngIf="restaurant.category" class="eco-card-category-badge">
          {{ restaurant.category }}
        </div>
      </div>
      <div class="eco-card-body">
        <h3 class="eco-card-name">{{ restaurant.name }}</h3>
        <div class="eco-card-meta">
          <span class="eco-card-rating">
            <span class="eco-card-rating-star">★</span>
            <span class="eco-card-rating-value">{{ restaurant.rating }}</span>
          </span>
          <span class="eco-card-separator">|</span>
          <span>🕒 {{ restaurant.deliveryTime }} min</span>
          <span class="eco-card-separator">|</span>
          <span [class.eco-card-fee-free]="restaurant.deliveryFee === 'Free' || restaurant.deliveryFee === 'Gratis'">
            {{ restaurant.deliveryFee }}
          </span>
        </div>
        <div *ngIf="restaurant.tags && restaurant.tags.length" class="eco-card-tags">
          <span *ngFor="let tag of restaurant.tags" class="eco-card-tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
}
