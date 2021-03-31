import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasPage } from './tareas.page';

const routes: Routes = [
  {
    path: '',
    component: TareasPage
  },
  {
    path: 'form-tarea',
    loadChildren: () => import('./form-tarea/form-tarea.module').then( m => m.FormTareaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasPageRoutingModule {}
