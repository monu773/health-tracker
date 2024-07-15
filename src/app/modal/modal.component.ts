import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalService } from '../modal.service';
import { templateCreate, Workout } from '../template-list/model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalData: any;
  templateform!: FormGroup;

  constructor(private modalService: NgbModal, private formbuilder: FormBuilder, private modalService2: ModalService) {}

  ngOnInit(): void {
    this.templateform = this.formbuilder.group({
      name: ['', Validators.required],
      workouts: this.formbuilder.array([this.createWorkoutFormGroup()])
    });
  }

  get workoutForms() {
    return this.templateform.get('workouts') as FormArray;
  }

  createWorkoutFormGroup(): FormGroup {
    return this.formbuilder.group({
      type: ['', Validators.required],
      minutes: ['', Validators.required]
    });
  }

  addWorkout() {
    this.workoutForms.push(this.createWorkoutFormGroup());
  }

  removeWorkout(index: number) {
    this.workoutForms.removeAt(index);
  }

  addtemplate() {
    const data: templateCreate = this.templateform.value;
    this.modalService2.addTemplate(data);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
