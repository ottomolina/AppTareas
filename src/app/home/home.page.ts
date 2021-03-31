import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService } from '../services/tareas/tareas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  idSelected: any;
  show: boolean;
  tareas = [];
  tarea = { id: 0, name: null, user: 1 };

  constructor(public navCtrl: NavController,
              public tareaService: TareasService
  ) {
    this.show = false;
    this.idSelected = 0;

    tareaService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    });
  }

  saveTarea(){
    if (this.idSelected !== 0){
      this.tareaService.updateTarea(this.tarea);
    }else{
      this.tareaService.saveTarea(this.tarea);
    }
    this.clear();
  }
  selectTarea(id){
    this.show = true;
    this.idSelected = id;

    let receivedTarea: any;

    this.tareaService.getTarea(id).subscribe(tarea => {
      receivedTarea = tarea;
      this.tarea = receivedTarea;
    });
  }
  removeSelectedTarea(){
    this.tareaService.removeTarea(this.idSelected);
    this.clear();
  }

  clear(){
    this.show = false;
    this.idSelected = 0;
    this.tarea.name = null;
    this.tarea.id = null;
  }

}
