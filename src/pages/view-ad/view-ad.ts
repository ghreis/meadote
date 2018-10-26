import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-view-ad',
  templateUrl: 'view-ad.html',
})
export class ViewAdPage {

  public ad: any;

  public anuncio : Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore) {

    this.ad = this.navParams.data.ad || {}

    this.anuncio = db.collection('anuncios', ref => ref.where('idAd', '==', this.ad.idAd)).valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAdPage');
  }

}
