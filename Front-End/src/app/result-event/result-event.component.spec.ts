import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEventComponent } from './result-event.component';

describe('ResultEventComponent', () => {
  let component: ResultEventComponent;
  let fixture: ComponentFixture<ResultEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
