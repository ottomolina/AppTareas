import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { TareasService } from '../../../services/tareas/tareas.service';
import { AuthorizeService } from '../../../services/authorize/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.page.html',
  styleUrls: ['./form-tarea.page.scss'],
})
export class FormTareaPage implements OnInit {
  public titulo = 'Nueva tarea';
  public data: any;

  public formTarea: FormGroup;

  constructor(public fb: FormBuilder,
              public navCtrl: NavController,
              public tareaService: TareasService,
              private authorize: AuthorizeService,
              private route: ActivatedRoute,
              private router: Router,
              private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.objTarea;
        this.loadData(this.data);
      }
    });
  }

  public loadData(data) {
    if (data) {
      this.titulo = 'Modificar tarea';
    }
    this.formTarea = this.fb.group({
      nombre: [data ? data.nombre : '',
        [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ0-9 ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      fecha: [data ? data.fecha : '', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onClickGuardar() {
    const form = this.formTarea.value;
    const { usuario } = this.authorize.getUser();
    form.usuario = usuario;

    if (this.data) {
      form.id = this.data.id;
      this.tareaService.updateTarea(form);
    } else {
      this.tareaService.saveTarea(form);
    }
    this.navCtrl.navigateBack('/tareas');
  }

  onClickCancelar() {
    this.navCtrl.navigateBack('/tareas');
  }

  onClickEliminar() {
    this.presentAlert('¿Estás seguro de eliminar este registro?', () => {
      this.tareaService.removeTarea(this.data.id);
      this.navCtrl.navigateBack('/tareas');
    });
  }

  async presentAlert(mensaje: string, callback?: any) {
    let alert;
    if (callback) {
      alert = await this.alertController.create({
        header: 'Información',
        message: mensaje,
        buttons: [
          { text: 'Sí', handler: callback },
          { text: 'No' }
        ]
      });
    } else {
      alert = await this.alertController.create({
        header: 'Información',
        message: mensaje,
        buttons: ['OK']
      });
    }
    await alert.present();
  }

}
