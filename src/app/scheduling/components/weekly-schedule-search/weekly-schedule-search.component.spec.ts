import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyScheduleSearchComponent } from './weekly-schedule-search.component';

describe('WeeklyScheduleSearchComponent', () => {
  let component: WeeklyScheduleSearchComponent;
  let fixture: ComponentFixture<WeeklyScheduleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyScheduleSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyScheduleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
