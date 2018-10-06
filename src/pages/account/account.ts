import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddAdPage } from '../add-ad/add-ad'
import { EditAdPage } from '../edit-ad/edit-ad'


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
