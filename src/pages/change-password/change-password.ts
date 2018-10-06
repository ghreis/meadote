import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'
import { AlertController } from 'ionic-angular';

import { AccountPage } from '../account/account'

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  public cancelAction() : void{
    this.navCtrl.setRoot(AccountPage)
  }

  public changePassword(form: NgForm) : void{
    let user = this.afAuth.auth.currentUser
    let newPassword = form.value.novaSenha
    let confirmPassword = form.value.confirmarSenha

    if(newPassword === confirmPassword){
      user.updatePassword(newPassword)
      .then((result) => {
        this.navCtrl.setRoot(AccountPage)
      })
    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'As senhas precisam ser iguais !!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
