import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { HomePage } from '../home/home'



//@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public obj: any;
  public localidades: any;
  public cidades: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationServiceProvider, public http: HttpClient) {
    this.getAllLocations();

    this.cidades = this.locationService.location
  }

  saveLocation(): void {
    this.locationService.location = this.cidades
    this.navCtrl.setRoot(HomePage)
  }

  cleanLocation() {
    this.locationService.location = "Escolha uma cidade"
    this.navCtrl.setRoot(HomePage)
  }

  return() {
    this.navCtrl.setRoot(HomePage)
  }

  getCity() {
    this.locationService.location = this.cidades
  }

  getAllLocations() {
    let data: Observable<any>
    data = this.http.get(`http://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/35004/municipios`)
    data.subscribe(result => {
      this.localidades = result
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

}
