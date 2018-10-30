import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationServiceProvider {

  location: any;

  constructor(public http: HttpClient) {
    this.location = "Escolha uma cidade"
    console.log('Hello LocationServiceProvider Provider');
  }


}
