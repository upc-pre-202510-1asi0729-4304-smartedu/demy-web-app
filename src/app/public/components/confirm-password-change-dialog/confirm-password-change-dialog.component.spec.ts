import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordChangeDialogComponent } from './confirm-password-change-dialog.component';

describe('ConfirmPasswordChangeDialogComponent', () => {
  let component: ConfirmPasswordChangeDialogComponent;
  let fixture: ComponentFixture<ConfirmPasswordChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPasswordChangeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
