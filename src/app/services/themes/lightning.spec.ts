import { TestBed } from '@angular/core/testing';

import { Lightning } from './lightning';

describe('Lightning', () => {
  let service: Lightning;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lightning);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
