import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartViewComponent } from './song-part-view.component';

describe('SongPartViewComponent', () => {
  let component: SongPartViewComponent;
  let fixture: ComponentFixture<SongPartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
