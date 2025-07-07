import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportPageComponent } from './attendance-report-page.component';

describe('AttendanceReportPageComponent', () => {
  let component: AttendanceReportPageComponent;
  let fixture: ComponentFixture<AttendanceReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceReportPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttendanceReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
