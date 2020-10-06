import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsPageComponent } from './patterns-page.component';

describe('PatternsPageComponent', () => {
  let component: PatternsPageComponent;
  let fixture: ComponentFixture<PatternsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
