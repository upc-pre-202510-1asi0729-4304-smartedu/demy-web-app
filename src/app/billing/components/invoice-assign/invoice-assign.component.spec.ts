import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAssignComponentComponent } from './invoice-assign.component';

describe('InvoiceAssignComponentComponent', () => {
  let component: InvoiceAssignComponentComponent;
  let fixture: ComponentFixture<InvoiceAssignComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAssignComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceAssignComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
