import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { LocationPage } from '../location/location';
import { LoginPage } from '../login/login';
import { ViewAdPage } from '../view-ad/view-ad';
import { AccountPage } from '../account/account'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pets : string = "cachorros"

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
  }

  public logar(): void{
    let user = this.afAuth.auth.currentUser
    if(user != null){
      this.navCtrl.setRoot(AccountPage);
    }
    else{
      this.navCtrl.push(LoginPage);
    }
    //this.afAuth.auth.onAuthStateChanged((user) =>{
      //if(user != null){
        //this.navCtrl.setRoot(AccountPage);
      //}
      //else{
        //this.navCtrl.setRoot(LoginPage);
      //}
    //})
  }

  public changeLocation(): void{
    this.navCtrl.push(LocationPage)
  }

  public viewAd(): void{
    this.navCtrl.push(ViewAdPage)
  }


}
