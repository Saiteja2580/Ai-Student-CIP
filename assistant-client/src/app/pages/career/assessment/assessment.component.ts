import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;
  formData: any = {};

  ngOnInit() {
    this.updateProgress();
  }

  updateProgress() {
    const progress = (this.currentStep / this.totalSteps) * 100;
    const progressBar = document.getElementById('progressBar');
    const currentStepEl = document.getElementById('currentStep');
    const progressPercentageEl = document.getElementById('progressPercentage');

    if (progressBar && currentStepEl && progressPercentageEl) {
      progressBar.style.width = `${progress}%`;
      currentStepEl.textContent = this.currentStep.toString();
      progressPercentageEl.textContent = Math.round(progress).toString();
    }
  }

  showStep(step: number) {
    const steps = document.querySelectorAll('.step-content');
    steps.forEach((el) => el.classList.add('hidden'));

    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
      currentStepEl.classList.remove('hidden');
    }

    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (prevBtn && nextBtn && submitBtn) {
      prevBtn.classList.toggle('hidden', step === 1);
      nextBtn.classList.toggle('hidden', step === this.totalSteps);
      submitBtn.classList.toggle('hidden', step !== this.totalSteps);
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.showStep(this.currentStep);
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
      this.updateProgress();
    }
  }

  onSubmit() {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    // Add your form submission logic here
  }
}
