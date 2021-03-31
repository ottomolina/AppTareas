import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TareasService } from '../../../services/tareas/tareas.service';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.page.html',
  styleUrls: ['./form-tarea.page.scss'],
})
export class FormTareaPage implements OnInit {
  public titulo = 'Nueva tarea';

  public formTarea: FormGroup;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              public tareaService: TareasService
  ) {
    this.formTarea = this.fb.group({
      nombre: ['',
        [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ0-9 ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      fecha: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onClickGuardar() {
    console.log('onClickGuardar');
    console.log(this.formTarea.value);
    this.tareaService.saveTarea(this.formTarea.value);
    this.navCtrl.navigateBack('/tareas');
  }

  onClickCancelar() {
    this.navCtrl.navigateBack('/tareas');
  }

}
