import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTareaPageRoutingModule } from './form-tarea-routing.module';

import { FormTareaPage } from './form-tarea.page';
import { TareasService } from '../../../services/tareas/tareas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormTareaPageRoutingModule
  ],
  declarations: [FormTareaPage],
  providers: [
    TareasService
  ]
})
export class FormTareaPageModule {}
