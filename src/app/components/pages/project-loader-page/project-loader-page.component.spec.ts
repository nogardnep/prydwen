import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLoaderPageComponent } from './project-loader-page.component';

describe('ProjectLoaderPageComponent', () => {
  let component: ProjectLoaderPageComponent;
  let fixture: ComponentFixture<ProjectLoaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLoaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLoaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
