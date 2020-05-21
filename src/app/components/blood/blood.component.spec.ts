import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodComponent } from './blood.component';

describe('BloodComponent', () => {
  let component: BloodComponent;
  let fixture: ComponentFixture<BloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
