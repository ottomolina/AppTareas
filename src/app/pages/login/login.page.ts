import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public picture;
  public name;
  public email;

  constructor(// private fb: Facebook,
              // private fireAuth: AngularFireAuth,
              private router: Router
  ) { }

  ngOnInit() {
  }

  async loginFacebook() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //   .then((res: FacebookLoginResponse) => {
  //     this.onLoginSuccess(res);
  //     console.log(res.authResponse.accessToken);
  //   }).catch(e => console.log('Error logging into Facebook', e));
  // }

  // onLoginSuccess(res: FacebookLoginResponse) {
  //   // const { token, secret } = res;
  //   const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //   this.fireAuth.signInWithCredential(credential)
  //     .then((response) => {
  //       this.router.navigate(['/home']);
  //     });

  }

}
