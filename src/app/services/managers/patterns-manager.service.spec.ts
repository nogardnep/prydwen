import { TestBed } from '@angular/core/testing';

import { PatternsManagerService } from './patterns-manager.service';

describe('PatternsManagerService', () => {
  let service: PatternsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
