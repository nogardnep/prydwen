import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencePageComponent } from './sequence-page.component';

describe('SequencePageComponent', () => {
  let component: SequencePageComponent;
  let fixture: ComponentFixture<SequencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
