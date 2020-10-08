import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencePatternViewComponent } from './sequence-pattern-view.component';

describe('SequencePatternViewComponent', () => {
  let component: SequencePatternViewComponent;
  let fixture: ComponentFixture<SequencePatternViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencePatternViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencePatternViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
