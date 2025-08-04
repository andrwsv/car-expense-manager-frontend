import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTracking } from './fuel-tracking';

describe('FuelTracking', () => {
  let component: FuelTracking;
  let fixture: ComponentFixture<FuelTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelTracking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
