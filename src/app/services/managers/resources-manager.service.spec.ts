import { TestBed } from '@angular/core/testing';

import { ResourcesManagerService } from './resources-manager.service';

describe('ResourcesManagerService', () => {
  let service: ResourcesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
