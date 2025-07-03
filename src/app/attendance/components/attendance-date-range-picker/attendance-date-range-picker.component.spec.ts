import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDateRangePickerComponent } from './attendance-date-range-picker.component';

describe('AttendanceDateRangePickerComponent', () => {
  let component: AttendanceDateRangePickerComponent;
  let fixture: ComponentFixture<AttendanceDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceDateRangePickerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttendanceDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
