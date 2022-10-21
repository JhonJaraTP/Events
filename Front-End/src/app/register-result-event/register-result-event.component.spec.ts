import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterResultEventComponent } from './register-result-event.component';

describe('RegisterResultEventComponent', () => {
  let component: RegisterResultEventComponent;
  let fixture: ComponentFixture<RegisterResultEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterResultEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterResultEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
