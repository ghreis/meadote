import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddAdPage } from '../add-ad/add-ad'
import { EditAdPage } from '../edit-ad/edit-ad'

import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public anuncios : Observable<any[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore) {

    this.anuncios = db.collection('anuncios', ref => ref.where('uid', '==', "83YOzY9wBqXtHv0rFqMrWgt56qE3")).valueChanges()

  }

  public add(): void {
    this.navCtrl.push(AddAdPage)
  }

  public editAd(): void {
    this.navCtrl.push(EditAdPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
