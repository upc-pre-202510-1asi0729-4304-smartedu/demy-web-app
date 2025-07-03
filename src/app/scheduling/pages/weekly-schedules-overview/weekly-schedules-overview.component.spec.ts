import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySchedulesOverviewComponent } from './weekly-schedules-overview.component';

describe('ViewWeeklySchedulesComponent', () => {
  let component: WeeklySchedulesOverviewComponent;
  let fixture: ComponentFixture<WeeklySchedulesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklySchedulesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklySchedulesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
