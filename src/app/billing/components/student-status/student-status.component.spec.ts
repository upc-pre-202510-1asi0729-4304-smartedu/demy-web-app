import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatusComponent } from './student-status.component';

describe('StudentStatusComponent', () => {
  let component: StudentStatusComponent;
  let fixture: ComponentFixture<StudentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
