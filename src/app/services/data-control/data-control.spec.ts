import { TestBed } from '@angular/core/testing';
import { DataControl } from './data-control';

describe('DataControl', () => {
  let service: DataControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
