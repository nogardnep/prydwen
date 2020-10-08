import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesViewerComponent } from './resources-viewer.component';

describe('ResourcesViewerComponent', () => {
  let component: ResourcesViewerComponent;
  let fixture: ComponentFixture<ResourcesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
