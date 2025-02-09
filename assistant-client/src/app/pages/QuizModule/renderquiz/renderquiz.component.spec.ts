import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderquizComponent } from './renderquiz.component';

describe('RenderquizComponent', () => {
  let component: RenderquizComponent;
  let fixture: ComponentFixture<RenderquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderquizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
