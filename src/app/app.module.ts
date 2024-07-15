import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { DecimalPipe, NgFor } from '@angular/common';
import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  NgbTypeaheadModule,
  NgbDatepickerModule,
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, TemplateDetailComponent, TemplateListComponent, ModalComponent, PaginationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DecimalPipe,
    NgFor,
    AsyncPipe,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
