import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionSectionComponent } from './selection-section.component';

describe('SelectionSectionComponent', () => {
  let component: SelectionSectionComponent;
  let fixture: ComponentFixture<SelectionSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
