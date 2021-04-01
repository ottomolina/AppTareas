import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthorizeService } from '../../services/authorize/authorize.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: any;
  public flag = false;

  constructor(private fb: Facebook,
              private router: Router,
              private authorize: AuthorizeService,
              private authService: AuthService,
              private usuarioService: UsuariosService,
              private platform: Platform
  ) { }

  ngOnInit() {
    this.user = null;
    this.flag = false;
  }

  async loginFacebook() {
    if (this.platform.is('capacitor')) {
      this.loginFacebookAndroid();
    } else {
      this.loginFacebookWeb();
    }
  }

  loginFacebookAndroid() {
    this.fb.login(['email']).then((res: FacebookLoginResponse) => {
      if (res.status === 'connected') {
        this.getUserDetail(res.authResponse.userID);
        this.flag = true;
      } else {
        this.authorize.closeSession();
        this.flag = false;
      }
    }).catch(e => {
      this.flag = false;
      console.log('Error logging into Facebook', e);
    });
  }

  loginFacebookWeb() {
    this.authService.loginWithFB().then(result => {
      const { displayName, email, uid, photoURL } = result;
      const user = { name: displayName, email, uid, picture: photoURL, usuario: '' };
      this.validaUsuario(user);

    }).catch(err => {
      console.log(err);
    });
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile']).then(res => {
      const { picture, id, ...user } = res;

      user.picture = picture.data.url;
      user.uid = id;
      user.usuario = '';
      this.validaUsuario(user);
    }).catch(e => {
      console.log(e);
    });
  }

  public validaUsuario(data) {
    const { uid } = data;
    // validar que el usuario existe
    this.usuarioService.getUsuario(uid).subscribe(usuario => {
      if (!usuario) { // el usuario no existe
        const splitUser = data.name.split(' ');
        const usuarioFire = `${splitUser[0].substring(0, 2)}${splitUser[1].substring(0, 2)}${this.random()}`;
        data.usuario = usuarioFire;

        this.enviarDatosFirebase(data);
        this.user = data;
      } else {
        this.user = usuario;
      }
      this.authorize.setSession(this.user);
    });
  }

  enviarDatosFirebase(user) {
    const { picture, ...data } = user;
    this.usuarioService.saveUsuario(data);
  }

  random() {
    const min = 0;
    const max = 9999;
    const valor = Math.floor(Math.random() * (max - min + 1) + min);
    let s = valor + '';
    while (s.length < 4) {
      s = '0' + s;
    }
    return s;
  }

  continue() {
    this.router.navigate(['/']);
  }

}
