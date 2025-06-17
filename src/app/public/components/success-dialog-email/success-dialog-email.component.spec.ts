import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogEmailComponent } from './success-dialog-email.component';

describe('SuccessDialogEmailComponent', () => {
  let component: SuccessDialogEmailComponent;
  let fixture: ComponentFixture<SuccessDialogEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessDialogEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessDialogEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
