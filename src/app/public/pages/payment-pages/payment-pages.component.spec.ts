import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPagesComponent } from './payment-pages.component';

describe('PaymentPagesComponent', () => {
  let component: PaymentPagesComponent;
  let fixture: ComponentFixture<PaymentPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
