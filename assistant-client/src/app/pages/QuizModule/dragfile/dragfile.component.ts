import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { QuizServiceService } from '../../../services/quiz.service';
import { QuizResponse } from '../../../models/quiz.model';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import {
  NgxSpinnerComponent,
  NgxSpinnerModule,
  NgxSpinnerService,
} from 'ngx-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dragfile',
  imports: [FormsModule, SpinnerComponent, NgIf],
  templateUrl: './dragfile.component.html',
  styleUrl: './dragfile.component.css',
})
export class DragfileComponent implements OnInit {
  spinnerService = inject(NgxSpinnerService);
  isLoading = false;
  isDragover = false;
  router = inject(Router);
  selectedFile: File | null = null;
  toaster: ToasterService = inject(ToasterService);
  quizService = inject(QuizServiceService);
  quizResponse: QuizResponse | undefined;
  topicName: string = '';
  difficultyLevel: string = 'medium';

  ngOnInit(): void {
    this.spinnerService.show();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragover = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onFileSelected({ target: { files: files } } as any);
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.toaster.showSuccess('File Uploaded Successfully', 'Success');
      this.selectedFile = input.files[0];
    }
  }

  generateQuiz() {
    this.isLoading = true;
    if (!this.selectedFile) {
      alert('Please select a PDF file!');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('topic', this.topicName);
    formData.append('difficulty', this.difficultyLevel);

    this.quizService.getQuizQuetsions(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.quizResponse = response;

        const responsequiz = {
          filename: this.selectedFile?.name,
          ...this.quizResponse,
        };
        console.log(responsequiz);

        this.quizService.setQuizData(responsequiz);
        this.router.navigateByUrl('/quiz/renderquiz');
      },
      error: (err) => {
        alert(err.message);
        this.isLoading = false;
      },
    });
  }
}
