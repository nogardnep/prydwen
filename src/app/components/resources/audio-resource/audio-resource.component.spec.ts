import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioResourceComponent } from './audio-resource.component';

describe('AudioResourceComponent', () => {
  let component: AudioResourceComponent;
  let fixture: ComponentFixture<AudioResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
