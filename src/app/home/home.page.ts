import { Facebook } from '@ionic-native/facebook/ngx';
import { Component } from '@angular/core';
import { AuthorizeService } from '../services/authorize/authorize.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router,
              public fb: Facebook,
              public auth: AuthorizeService,
              private platform: Platform
  ) { }

  logout() {
    if (this.platform.is('capacitor')) {
      this.fb.logout().then(resp => {
        console.log('logout', resp);
        this.auth.closeSession();
        this.router.navigate(['/login']);
      });
    } else {
      this.auth.closeSession();
      this.router.navigate(['/login']);
    }
  }

}
