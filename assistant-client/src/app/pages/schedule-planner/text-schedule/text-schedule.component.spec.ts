import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextScheduleComponent } from './text-schedule.component';

describe('TextScheduleComponent', () => {
  let component: TextScheduleComponent;
  let fixture: ComponentFixture<TextScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
