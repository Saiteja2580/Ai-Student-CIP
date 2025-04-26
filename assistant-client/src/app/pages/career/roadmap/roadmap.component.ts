import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { CareerService } from '../../../services/career.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgIf } from '@angular/common';
import { RoadmapModule } from '../../../models/career.model';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, NgIf],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '0.5s ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AssessmentComponent implements OnInit {
  spinnerService = inject(NgxSpinnerService);
  careerService = inject(CareerService);

  topic: string = '';
  roadmap: RoadmapModule[] = [];

  isLoading = false;
  error: string = '';
  selectedLevel: string = 'all';
  showTopics: { [key: number]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize showTopics for each module
    this.showTopics = {};
    this.spinnerService.show();
  }

  generateRoadmap() {
    if (!this.topic.trim()) {
      this.error = 'Please enter a topic';
      return;
    }
    this.isLoading = true;
    this.careerService.getRoadmap(this.topic).subscribe((data: any) => {
      console.log(data);
      this.roadmap = data;
      this.isLoading = false;
    });
  }

  toggleTopics(index: number) {
    this.showTopics[index] = !this.showTopics[index];
  }

  getLevelColor(level: string): string {
    const colors = {
      beginner: 'bg-green-500',
      intermediate: 'bg-blue-500',
      advanced: 'bg-purple-500',
      expert: 'bg-red-500',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-500';
  }

  // private generateSampleRoadmap(topic: string): RoadmapModule[] {
  //   return [
  //     {
  //       title: 'Foundation',
  //       description: 'Basic concepts and fundamentals',
  //       duration: '2-3 weeks',
  //       level: 'beginner',
  //       estimatedHours: 40,
  //       topics: [
  //         'Introduction to ' + topic,
  //         'Core concepts',
  //         'Basic terminology',
  //         'Setting up development environment',
  //         'First steps and basic projects',
  //       ],
  //     },
  //     {
  //       title: 'Intermediate Concepts',
  //       description: 'Building on the basics',
  //       duration: '3-4 weeks',
  //       level: 'intermediate',
  //       estimatedHours: 60,
  //       topics: [
  //         'Advanced features',
  //         'Best practices',
  //         'Common patterns',
  //         'Problem-solving techniques',
  //         'Code optimization',
  //       ],
  //     },
  //     {
  //       title: 'Advanced Topics',
  //       description: 'Deep dive into complex concepts',
  //       duration: '4-6 weeks',
  //       level: 'advanced',
  //       estimatedHours: 80,
  //       topics: [
  //         'Advanced techniques',
  //         'Performance optimization',
  //         'Security considerations',
  //         'Real-world applications',
  //         'Architecture patterns',
  //       ],
  //     },
  //     {
  //       title: 'Expert Level',
  //       description: 'Mastery and specialization',
  //       duration: '6-8 weeks',
  //       level: 'expert',
  //       estimatedHours: 100,
  //       topics: [
  //         'Advanced architecture',
  //         'System design',
  //         'Scalability',
  //         'Industry best practices',
  //         'Leading-edge technologies',
  //       ],
  //     },
  //   ];
  // }
}
