import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
      <div class="flex items-center space-x-2">
        <button mat-button
                [disabled]="currentPage === 0"
                (click)="changePage.emit(currentPage - 1)"
                class="flex items-center space-x-1">
          <mat-icon>chevron_left</mat-icon>
          <span>Previous</span>
        </button>
      </div>

      <div class="flex items-center space-x-4">
        <span class="text-gray-600">
          Page {{ currentPage + 1 }} of {{ totalPages }}
        </span>
        <div class="flex space-x-2">
          <button mat-button
                  *ngFor="let page of visiblePages"
                  [color]="page === currentPage ? 'primary' : ''"
                  (click)="changePage.emit(page)"
                  class="min-w-[40px]">
            {{ page + 1 }}
          </button>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <button mat-button
                [disabled]="currentPage === totalPages - 1"
                (click)="changePage.emit(currentPage + 1)"
                class="flex items-center space-x-1">
          <span>Next</span>
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 1;
  @Input() limit: number = 5;
  @Output() changePage = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const halfLimit = Math.floor(this.limit / 2);
    
    let start = Math.max(0, this.currentPage - halfLimit);
    let end = Math.min(this.totalPages - 1, start + this.limit - 1);
    
    if (end - start + 1 < this.limit) {
      start = Math.max(0, end - this.limit + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
} 