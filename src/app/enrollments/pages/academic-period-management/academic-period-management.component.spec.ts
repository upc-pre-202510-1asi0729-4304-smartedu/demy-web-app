import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicPeriodManagementComponent } from './academic-period-management.component';

describe('AcademicPeriodManagementComponent', () => {
  let component: AcademicPeriodManagementComponent;
  let fixture: ComponentFixture<AcademicPeriodManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicPeriodManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicPeriodManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
