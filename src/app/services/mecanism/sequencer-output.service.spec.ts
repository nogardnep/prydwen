import { TestBed } from '@angular/core/testing';

import { SequencerOutputService } from './sequencer-output.service';

describe('SequencerOutputService', () => {
  let service: SequencerOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequencerOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
