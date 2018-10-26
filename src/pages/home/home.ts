import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  public anunciosCachorros : Observable<any[]>
  public anunciosGatos : Observable<any[]>

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public db: AngularFirestore) {
    this.anunciosCachorros = db.collection('anuncios', ref => ref.where('animal', '==', "Cachorro")).valueChanges()
    this.anunciosGatos = db.collection('anuncios', ref => ref.where('animal', '==', "Gato")).valueChanges()
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

  public viewAd(ad: any): void{
    this.navCtrl.push(ViewAdPage, {ad : ad})
    console.log(ad.idAd)
  }

}
