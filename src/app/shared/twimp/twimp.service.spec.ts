import { TestBed } from '@angular/core/testing';

import { TwimpService } from './twimp.service';

describe('TwimpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwimpService = TestBed.get(TwimpService);
    expect(service).toBeTruthy();
  });
});
