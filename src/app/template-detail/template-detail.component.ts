import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { templateModel } from '../template-list/model';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent implements OnInit {
  public dataId!:number;
  public template:undefined|any;
  constructor(private activatedroute:ActivatedRoute,private route:Router, private api:ApiService) { }
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.dataId = +idParam; // Convert to number if necessary
        this.loadTemplateData(this.dataId);
      }
    });
  }

  private loadTemplateData(dataId: number): void {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');
    const templateData = templates.find(template => template.id === dataId);

    if (templateData) {
      this.template = templateData;
    } else {
      console.log('Template not found');
    }
  }
}
