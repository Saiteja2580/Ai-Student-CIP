import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformAnalyzerComponent } from './perform-analyzer.component';

describe('PerformAnalyzerComponent', () => {
  let component: PerformAnalyzerComponent;
  let fixture: ComponentFixture<PerformAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformAnalyzerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
