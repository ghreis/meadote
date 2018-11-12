import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth'

import { HomePage } from '../pages/home/home';
import { ChangePasswordPage } from '../pages/change-password/change-password';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  appMenuItems: Array<MenuItem>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, public afAuth: AngularFireAuth) {

    this.appMenuItems = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Trocar Senha', component: ChangePasswordPage, icon: 'key' }
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public openPage(page): void {
    this.nav.setRoot(page.component)
  }

  public logout(): void {
    this.afAuth.auth.signOut()
    this.nav.setRoot(HomePage)
  }

  public deleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'Excluir Conta',
      message: 'Tem certeza que deseja excluir sua conta?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let user = this.afAuth.auth.currentUser
            user.delete()
            this.afAuth.auth.signOut()
            this.nav.setRoot(HomePage)
          }
        }
      ]
    });
    alert.present();
  }
}

