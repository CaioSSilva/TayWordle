import { TestBed } from '@angular/core/testing';

import { Lifes } from './lifes';

describe('Lifes', () => {
  let service: Lifes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lifes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
