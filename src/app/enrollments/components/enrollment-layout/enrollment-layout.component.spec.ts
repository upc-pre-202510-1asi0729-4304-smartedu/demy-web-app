import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentLayoutComponent } from './enrollment-layout.component';

describe('EnrollmentLayoutComponent', () => {
  let component: EnrollmentLayoutComponent;
  let fixture: ComponentFixture<EnrollmentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
