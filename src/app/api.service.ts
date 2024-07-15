import { Injectable } from '@angular/core';
import { templateCreate, templateModel, ApiResponse } from './template-list/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  addTemplate(data: templateCreate): ApiResponse {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');

    // Assign an ID to the new template
    const newId = templates.length ? templates[templates.length - 1].id + 1 : 1;
    const newTemplate: templateModel = { ...data, id: newId };

    // Add the new template to the array
    templates.push(newTemplate);

    // Save the updated templates array to LocalStorage
    localStorage.setItem('templates', JSON.stringify(templates));

    return { success: true, message: 'Template added successfully' };
  }

  getTemplates(): templateModel[] {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');
    return templates;
  }

  deleteTemplate(id: number): ApiResponse {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');

    // Find the index of the template with the specified ID
    const index = templates.findIndex(template => template.id.toString() === id.toString());

    if (index !== -1) {
      // Remove the template from the array
      templates.splice(index, 1);

      // Save the updated templates array to LocalStorage
      localStorage.setItem('templates', JSON.stringify(templates));

      return { success: true, message: 'Template deleted successfully' };
    } else {
      return { success: false, message: 'Template not found' };
    }
  }

  fetchTemplateDetail(id: number): templateModel | ApiResponse {
    let templates: templateModel[] = JSON.parse(localStorage.getItem('templates') || '[]');

    // Find the template with the specified ID
    const template = templates.find(template => template.id === id);

    if (template) {
      return template;
    } else {
      return { success: false, message: 'Template not found' };
    }
  }
}
