import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CareerAssessmentModel } from '../../../models/career.model';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent implements OnInit {
  @ViewChild('careerForm') careerForm!: NgForm;

  currentStep = 1;
  totalSteps = 4;
  formData: CareerAssessmentModel = {
    interests: {
      enjoyedActivities: [],
      enjoyedSchoolSubjects: [],
    },
    skills: {
      problemSolving: 1,
      communication: 1,
      teamwork: 1,
      leadership: 1,
      proudProject: '',
    },
    values: {
      rankedWorkValues: {
        autonomy: 1,
        collaboration: 1,
        creativity: 1,
        stability: 1,
        highIncome: 1,
      },
    },
    learningStyle: {
      reading: 1,
      practical: 1,
      visual: 1,
      group: 1,
      comfortWithTechnicalDetail: 1,
    },
  };

  // Validation error messages
  validationErrors: { [key: string]: string } = {};

  // Minimum requirements for form validation
  private readonly MIN_ACTIVITIES = 2;
  private readonly MIN_SUBJECTS = 2;
  private readonly MIN_PROJECT_LENGTH = 20;

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

    this.currentStep = step;
    this.updateProgress();
  }

  nextStep() {
    // Validate current step before proceeding
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.showStep(this.currentStep);
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Form submitted:', this.formData);
      // Add your form submission logic here
    }
  }

  private validateCurrentStep(): boolean {
    this.validationErrors = {};

    switch (this.currentStep) {
      case 1:
        return this.validateInterestsStep();
      case 2:
        return this.validateSkillsStep();
      case 3:
        return this.validateValuesStep();
      case 4:
        return this.validateLearningStyleStep();
      default:
        return true;
    }
  }

  private validateInterestsStep(): boolean {
    let isValid = true;

    // Validate activities
    if (
      this.formData.interests.enjoyedActivities.length < this.MIN_ACTIVITIES
    ) {
      this.validationErrors[
        'activities'
      ] = `Please select at least ${this.MIN_ACTIVITIES} activities you enjoy.`;
      isValid = false;
    }

    // Validate subjects
    if (
      this.formData.interests.enjoyedSchoolSubjects.length < this.MIN_SUBJECTS
    ) {
      this.validationErrors[
        'subjects'
      ] = `Please select at least ${this.MIN_SUBJECTS} subjects you enjoyed in school.`;
      isValid = false;
    }

    return isValid;
  }

  private validateSkillsStep(): boolean {
    let isValid = true;

    // Validate project description
    if (
      !this.formData.skills.proudProject ||
      this.formData.skills.proudProject.trim().length < this.MIN_PROJECT_LENGTH
    ) {
      this.validationErrors[
        'proudProject'
      ] = `Please provide a project description with at least ${this.MIN_PROJECT_LENGTH} characters.`;
      isValid = false;
    }

    return isValid;
  }

  private validateValuesStep(): boolean {
    // Values step doesn't require specific validation as all fields have default values
    return true;
  }

  private validateLearningStyleStep(): boolean {
    // Learning style step doesn't require specific validation as all fields have default values
    return true;
  }

  private validateForm(): boolean {
    // Validate all steps
    const isInterestsValid = this.validateInterestsStep();
    const isSkillsValid = this.validateSkillsStep();
    const isValuesValid = this.validateValuesStep();
    const isLearningStyleValid = this.validateLearningStyleStep();

    return (
      isInterestsValid && isSkillsValid && isValuesValid && isLearningStyleValid
    );
  }

  // Helper methods for checkbox handling
  toggleActivity(activity: string) {
    const index = this.formData.interests.enjoyedActivities.indexOf(activity);
    if (index === -1) {
      this.formData.interests.enjoyedActivities.push(activity);
    } else {
      this.formData.interests.enjoyedActivities.splice(index, 1);
    }
  }

  toggleSubject(subject: string) {
    const index =
      this.formData.interests.enjoyedSchoolSubjects.indexOf(subject);
    if (index === -1) {
      this.formData.interests.enjoyedSchoolSubjects.push(subject);
    } else {
      this.formData.interests.enjoyedSchoolSubjects.splice(index, 1);
    }
  }
}
