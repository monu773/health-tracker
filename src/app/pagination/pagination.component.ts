import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}
