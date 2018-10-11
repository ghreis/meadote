import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

@IonicPage()
@Component({
  selector: 'page-edit-ad',
  templateUrl: 'edit-ad.html',
})
export class EditAdPage {

  public ad : any
  private todo: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, private formBuilder: FormBuilder) {
    
    this.ad = this.navParams.data.ad || {}

    this.todo = this.formBuilder.group({
      titulo: [this.ad.titulo],
      animal: [{value: this.ad.animal, disabled: true}],
      sexo: [this.ad.sexo],
      raca: [{value: this.ad.raca, disabled: true}],
      quantidade: [this.ad.quantidade],
      telefone: [this.ad.telefone],
      cidade: [this.ad.cidade],
      descricao: [this.ad.descricao],
    });
  }

  public editAd(): void {
    let anuncio = {
      titulo: this.todo.value['titulo'],
      sexo: this.todo.value['sexo'],
      quantidade: this.todo.value['quantidade'],
      telefone: this.todo.value['telefone'],
      cidade: this.todo.value['cidade'],
      descricao: this.todo.value['descricao'],
    }
    this.db.collection('anuncios').doc(this.ad.idAd).update(anuncio)
    .then((ref =>{
      this.navCtrl.pop()
    }))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAdPage');
  }

}
