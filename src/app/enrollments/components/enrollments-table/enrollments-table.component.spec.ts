import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsTableComponent } from './enrollments-table.component';

describe('EnrollmentsTableComponent', () => {
  let component: EnrollmentsTableComponent;
  let fixture: ComponentFixture<EnrollmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
