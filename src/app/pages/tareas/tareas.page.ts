import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService } from '../../services/tareas/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  public lstTareas = [];

  constructor(private tareaService: TareasService,
              private navController: NavController
  ) {
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    this.tareaService.getTareas().subscribe(tareas => {
      this.lstTareas = tareas;
    });

  }

  onClickAdd() {
    this.navController.navigateForward(['/tareas/form-tarea']);
  }

}
