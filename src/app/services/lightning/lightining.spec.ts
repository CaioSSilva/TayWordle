import { TestBed } from '@angular/core/testing';

import { Lightining } from './lightining';

describe('Lightining', () => {
  let service: Lightining;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lightining);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
