import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencerPlayerComponent } from './sequencer-player.component';

describe('SequencerPlayerComponent', () => {
  let component: SequencerPlayerComponent;
  let fixture: ComponentFixture<SequencerPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequencerPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencerPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
