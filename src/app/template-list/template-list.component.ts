import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { templateModel } from './model';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  filter = new FormControl('', { nonNullable: true });
  data: templateModel[] = [];
  filteredData: templateModel[] = [];
  pagedData: templateModel[] = [];
  totalItems = 0;
  pageSize = 3;
  currentPage = 1;
  workoutTypes: string[] = []; // Array to hold unique workout types

  private searchTerm$ = new Subject<string>();

  constructor(private api: ApiService, private modalService: ModalService) {
    this.setupSearchSubscription();
  }

  ngOnInit(): void {
    this.modalService.functionToBeCalled$.subscribe((data) => {
      this.filteredData.push(data);
      this.updatePagination();
    });
    this.getTemplates();
  }

  openModalWithData(data: any) {
    this.modalService.openModal(data);
  }

  getTemplates() {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');
    this.data = templates;
    this.filteredData = templates;
    this.totalItems = templates.length;
    this.setPagedData(1);
    this.updateWorkoutTypes();
  }

  setPagedData(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.filteredData.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  onPageChange(page: number): void {
    this.setPagedData(page);
  }

  deleteTemplate(event: Event, id: any) {
    event.stopPropagation();
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');

    const index = templates.findIndex(template => template.id.toString() === id.toString());

    if (index !== -1) {
      templates.splice(index, 1);
      localStorage.setItem('templates', JSON.stringify(templates));
      this.filteredData = this.filteredData.filter((item: any) => item.id !== id);
      this.updatePagination();
      this.updateWorkoutTypes(); // Update workout types after deletion
    }
  }

  searchData(event: any) {
    const text = event.target.value;
    this.searchTerm$.next(text);
  }

  filterByCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    console.log("Selected category:", category);
    
    if (category) {
      this.filteredData = this.data.filter((item: any) => {
        return item.workouts.some((workout: any) => workout.type === category);
      });
    } else {
      this.filteredData = this.data;
    }
    
    this.totalItems = this.filteredData.length;
    this.setPagedData(1);
  }
  

  private setupSearchSubscription() {
    this.searchTerm$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((term: string) => this.performSearch(term))
      )
      .subscribe((searchResults: any) => {
        this.filteredData = searchResults;
        this.updatePagination();
        this.updateWorkoutTypes(); // Update workout types after search
      });
  }

  private performSearch(term: string): Observable<any[]> {
    if (!this.data) {
      this.data = [];
    }

    const filteredData: any = this.data.filter((item: any) => {
      return item.name.toLowerCase().includes(term.toLowerCase())
    });

    return of(filteredData);
  }

  private updatePagination() {
    this.totalItems = this.filteredData.length;
    this.setPagedData(this.currentPage);
  }

  private updateWorkoutTypes() {
    const allWorkouts = this.data.flatMap(item => item.workouts);
    this.workoutTypes = Array.from(new Set(allWorkouts.map(workout => workout.type)));
  }

  getUniqueCategories() {
    return this.workoutTypes;
  }

  getTotalMinutes(workouts: { type: string, minutes: number }[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
  
}
