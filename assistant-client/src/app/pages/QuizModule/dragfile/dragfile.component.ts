import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { QuizServiceService } from '../../../services/quiz-service.service';

@Component({
  selector: 'app-dragfile',
  imports: [FormsModule],
  templateUrl: './dragfile.component.html',
  styleUrl: './dragfile.component.css',
})
export class DragfileComponent {
  router = inject(Router);
  selectedFile: File | null = null;
  toaster: ToasterService = inject(ToasterService);
  quizService = inject(QuizServiceService);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.toaster.showSuccess('File Uploaded Successfully', 'Success');
      this.selectedFile = input.files[0];
    }
  }

  generateQuiz() {
    if (!this.selectedFile) {
      alert('Please select a PDF file!');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.quizService.getQuizQuetsions(formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
