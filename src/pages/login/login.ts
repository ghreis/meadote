import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'

import { RegisterPage } from '../register/register'
import { AccountPage } from '../account/account'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  public entrar(form: NgForm): void{
    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
    .then((result) => {
      this.navCtrl.setRoot(AccountPage)
    })
    .catch((error) => {
      alert(error);
    });
  }

  public goRegister(): void{
    this.navCtrl.push(RegisterPage)
  }

  public forgotPass(): void{
    this.presentPrompt()
  }

  presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Recuperação de Senha',
    inputs: [
      {
        name: 'emailRequest',
        placeholder: 'Informe seu email'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          
        }
      },
      {
        text: 'Recuperar',
        handler: data => {
          this.afAuth.auth.sendPasswordResetEmail(data.emailRequest);
        }
      }
    ]
  });
  alert.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
