import { Facebook } from '@ionic-native/facebook/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TareasService } from '../services/tareas/tareas.service';
import { AuthorizeService } from '../services/authorize/authorize.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    TareasService,
    Facebook,
    AuthorizeService
  ]
})
export class HomePageModule {}
