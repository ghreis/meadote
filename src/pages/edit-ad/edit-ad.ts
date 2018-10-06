import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-ad',
  templateUrl: 'edit-ad.html',
})
export class EditAdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public editAd(): void {
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAdPage');
  }

}
