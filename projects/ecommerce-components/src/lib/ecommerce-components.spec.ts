import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceComponents } from './ecommerce-components';

describe('EcommerceComponents', () => {
  let component: EcommerceComponents;
  let fixture: ComponentFixture<EcommerceComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(EcommerceComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
