import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomClimateComponent } from './room-climate.component';

describe('RoomClimateComponent', () => {
  let component: RoomClimateComponent;
  let fixture: ComponentFixture<RoomClimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomClimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomClimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
