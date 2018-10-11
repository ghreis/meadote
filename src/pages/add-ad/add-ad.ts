import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-add-ad',
  templateUrl: 'add-ad.html',
})
export class AddAdPage {

  private todo: FormGroup

  constructor(public db: AngularFirestore, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public afAuth: AngularFireAuth) {

    this.todo = this.formBuilder.group({
      titulo: [''],
      animal: [''],
      sexo: [''],
      raca: [''],
      quantidade: [''],
      telefone: [''],
      cidade: [''],
      descricao: [''],
    });

  }

  public addAd(): void{

    let user = this.afAuth.auth.currentUser
    let anuncio = {
      uid: user.uid,
      titulo: this.todo.value['titulo'],
      animal: this.todo.value['animal'],
      sexo: this.todo.value['sexo'],
      raca: this.todo.value['raca'],
      quantidade: this.todo.value['quantidade'],
      telefone: this.todo.value['telefone'],
      cidade: this.todo.value['cidade'],
      descricao: this.todo.value['descricao'],
    }

    this.db.collection('anuncios').add(anuncio)
    .then((ref) =>{
      let id = ref.id
      this.db.collection('anuncios').doc(id).update({idAd: id})
      .then((ref) =>{
        this.navCtrl.pop()
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdPage');
  }

}
