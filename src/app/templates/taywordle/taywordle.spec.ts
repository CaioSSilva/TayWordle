import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taywordle } from './taywordle';

describe('Taywordle', () => {
  let component: Taywordle;
  let fixture: ComponentFixture<Taywordle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taywordle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taywordle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
