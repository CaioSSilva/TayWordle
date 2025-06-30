import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessForm } from './guess-form';

describe('GuessForm', () => {
  let component: GuessForm;
  let fixture: ComponentFixture<GuessForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
