import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScheduleModalComponent } from './weekly-schedule-modal.component';

describe('WeeklyScheduleModalComponent', () => {
  let component: WeeklyScheduleModalComponent;
  let fixture: ComponentFixture<WeeklyScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyScheduleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
