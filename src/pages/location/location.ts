import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  saveLocation():void {
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

}
