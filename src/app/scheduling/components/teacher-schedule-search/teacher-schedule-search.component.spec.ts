import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherScheduleSearchComponent } from './teacher-schedule-search.component';

describe('TeacherScheduleSearchComponent', () => {
  let component: TeacherScheduleSearchComponent;
  let fixture: ComponentFixture<TeacherScheduleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherScheduleSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherScheduleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
