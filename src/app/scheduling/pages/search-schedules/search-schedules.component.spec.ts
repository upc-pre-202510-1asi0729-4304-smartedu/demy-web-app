import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSchedulesComponent } from './search-schedules.component';

describe('SearchSchedulesComponent', () => {
  let component: SearchSchedulesComponent;
  let fixture: ComponentFixture<SearchSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
