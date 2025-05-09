import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualToggleNavComponent } from './contextual-toggle-nav.component';

describe('ContextualToggleNavComponentComponent', () => {
  let component: ContextualToggleNavComponent;
  let fixture: ComponentFixture<ContextualToggleNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextualToggleNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextualToggleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
