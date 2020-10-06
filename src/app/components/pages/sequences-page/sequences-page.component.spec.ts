import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencesPageComponent } from './sequences-page.component';

describe('SequencesPageComponent', () => {
  let component: SequencesPageComponent;
  let fixture: ComponentFixture<SequencesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
