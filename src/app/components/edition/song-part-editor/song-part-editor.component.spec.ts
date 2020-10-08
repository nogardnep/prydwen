import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPartEditorComponent } from './song-part-editor.component';

describe('SongPartEditorComponent', () => {
  let component: SongPartEditorComponent;
  let fixture: ComponentFixture<SongPartEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPartEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
