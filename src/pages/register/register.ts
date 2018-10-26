import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'

//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
  }

  public registrar(form: NgForm): void{
    let nome = form.value.nome;
    let email = form.value.email;
    let senha = form.value.senha;
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
    .then((result) =>{
      result.user.updateProfile({
        displayName: nome,
        photoURL: ""
      })
    })
    .catch((error)=>{
      alert(error)
    })
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
