import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(
    public atDB: AngularFireDatabase
  ) { }

  public getTareas(){
    return this.atDB.list('tareas/').valueChanges();
  }

  public saveTarea(tarea: any){
    const key = this.atDB.list('/tareas/').push(tarea).key;
    tarea.id = key;
    this.atDB.database.ref(`tareas/${tarea.id}`).set(tarea);

  }
  public updateTarea(tarea: any){
    this.atDB.database.ref(`tareas/${tarea.id}`).set(tarea);
  }
  public getTarea(id){
    return this.atDB.object(`tareas/${id}`).valueChanges();
  }
  public removeTarea(id){
    this.atDB.database.ref(`tareas/${id}`).remove();
  }
}
