import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOtpBoxComponent } from './ng-otp-box.component';

describe('NgOtpBoxComponent', () => {
  let component: NgOtpBoxComponent;
  let fixture: ComponentFixture<NgOtpBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgOtpBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgOtpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
