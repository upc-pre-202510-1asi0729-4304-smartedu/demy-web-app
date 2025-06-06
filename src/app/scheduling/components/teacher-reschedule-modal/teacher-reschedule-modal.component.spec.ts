import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRescheduleModalComponent } from './teacher-reschedule-modal.component';

describe('TeacherRescheduleModalComponent', () => {
  let component: TeacherRescheduleModalComponent;
  let fixture: ComponentFixture<TeacherRescheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRescheduleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRescheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
