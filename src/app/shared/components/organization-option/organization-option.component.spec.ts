import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationOptionComponent } from './organization-option.component';

describe('OrganizationOptionComponent', () => {
  let component: OrganizationOptionComponent;
  let fixture: ComponentFixture<OrganizationOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
