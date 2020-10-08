import { TestBed } from '@angular/core/testing';

import { ResourcesDataService } from './resources-data.service';

describe('ResourcesDataService', () => {
  let service: ResourcesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
