import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';

const routes: Routes = [
  {path:'templates',component:TemplateListComponent},
  {path:'templates/:id',component:TemplateDetailComponent},
  {path:'',redirectTo:'templates',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
