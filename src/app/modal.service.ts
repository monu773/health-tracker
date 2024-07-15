import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { Subject } from 'rxjs';
import { templateCreate, templateModel } from './template-list/model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {}

  private functionToBeCalledSubject = new Subject<any>();

  functionToBeCalled$ = this.functionToBeCalledSubject.asObservable();

  addTemplate(data: templateCreate) {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');

    const newId = templates.length ? templates[templates.length - 1].id + 1 : 1;
    const newTemplate: templateModel = { ...data, id: newId };

    templates.push(newTemplate);

    localStorage.setItem('templates', JSON.stringify(templates));
    console.log(newTemplate, 'Post Response');
    this.functionToBeCalledSubject.next(newTemplate);
    this.closeModal();

    return { success: true, message: 'Template added successfully' };
  }

  openModal(data: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.modalData = data;
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
