import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStudentSelectComponent } from './attendance-student-select.component';

describe('AttendanceStudentSelectComponent', () => {
  let component: AttendanceStudentSelectComponent;
  let fixture: ComponentFixture<AttendanceStudentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceStudentSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttendanceStudentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
