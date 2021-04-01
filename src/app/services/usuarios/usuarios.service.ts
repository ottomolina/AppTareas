import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private atDB: AngularFireDatabase
  ) { }

  public getUsuarios() {
    return this.atDB.list('usuarios/').valueChanges();
  }

  public saveUsuario(usuario: any) {
    // const key = this.atDB.list('usuarios/').push(usuario).key;
    // this.atDB.list('usuarios/').push(usuario);
    // usuario.id = key;
    this.atDB.database.ref(`usuarios/${usuario.uid}`).set(usuario);
  }

  public getUsuario(id){
    return this.atDB.object(`usuarios/${id}`).valueChanges();
  }
  public removeUsuario(id){
    console.log(id);
    this.atDB.database.ref(`usuarios/${id}`).remove();
  }

}
