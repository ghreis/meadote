import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddAdPage } from '../add-ad/add-ad'
import { EditAdPage } from '../edit-ad/edit-ad'

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs'


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public anuncios : Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public afAuth: AngularFireAuth, private storage: AngularFireStorage) {

    let user = this.afAuth.auth.currentUser

    this.anuncios = db.collection('anuncios', ref => ref.where('uid', '==', user.uid)).valueChanges()

  }

  public add(): void {
    this.navCtrl.setRoot(AddAdPage)
  }

  public editAd(ad: any): void {
    this.navCtrl.setRoot(EditAdPage, {ad : ad})
  }

  public apagar(idAd: string, namePhoto: string): void{
    this.storage.ref(namePhoto).delete();
    this.db.collection('anuncios').doc(idAd).delete();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
