import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-ad',
  templateUrl: 'add-ad.html',
})
export class AddAdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public addAd(): void{
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdPage');
  }

}
