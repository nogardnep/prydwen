import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceViewComponent } from './sequence-view.component';

describe('SequenceViewComponent', () => {
  let component: SequenceViewComponent;
  let fixture: ComponentFixture<SequenceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
