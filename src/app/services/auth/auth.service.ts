import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fbProvider;

  constructor(private Auth: AngularFireAuth) {
    this.fbProvider = new firebase.auth.FacebookAuthProvider();
  }

  loginWithFB(): Promise<firebase.User> {
    return new Promise<any>((resolve, reject) => {
      this.Auth.signInWithPopup(this.fbProvider).then((result) => {
        resolve(result.user);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
