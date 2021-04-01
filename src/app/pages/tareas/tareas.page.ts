import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService, Tareas } from '../../services/tareas/tareas.service';
import { AuthorizeService } from '../../services/authorize/authorize.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  public lstTareas = [];

  constructor(private tareaService: TareasService,
              private navController: NavController,
              private authorize: AuthorizeService
  ) {
    this.loadData();
  }

  ngOnInit() {
  }

  loadData() {
    const { usuario } = this.authorize.getUser();
    console.log(usuario);
    this.tareaService.getTareas().subscribe(tareas => {
      this.lstTareas = [];
      tareas.forEach((element: Tareas) => {
        if (element.usuario === usuario) {
          this.lstTareas.push(element);
        }
      });
    });
  }

  clickTarea(item) {
    console.log(item);
    const navExtras: NavigationExtras = { state: { objTarea: item } };
    this.navController.navigateForward('/tareas/form-tarea', navExtras);
  }

  onClickAdd() {
    const navExtras: NavigationExtras = { state: { objTarea: null } };
    this.navController.navigateForward('/tareas/form-tarea', navExtras);
  }

}
