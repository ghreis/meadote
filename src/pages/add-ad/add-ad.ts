import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from '@angular/fire/storage';

//@IonicPage()
@Component({
  selector: 'page-add-ad',
  templateUrl: 'add-ad.html',
})
export class AddAdPage {

  private todo: FormGroup
  myPhoto: any;

  constructor(public db: AngularFirestore, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, private camera: Camera, private storage: AngularFireStorage) {

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

  pictureFromGalery(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      const filePath = `anuncios/my-pet_${ new Date().getTime() }.jpg`;
      this.storage.ref(filePath).putString(this.myPhoto, 'data_url')
      .then((ref) => {
        ref.downloadURL // caminho para colocar no firestore
      })
     }, (err) => {
      // Handle error
     });
  }

  public addAd(): void{

    let user = this.afAuth.auth.currentUser
    let anuncio = {
      uid: user.uid,
      anunciante: user.displayName,
      titulo: this.todo.value['titulo'],
      animal: this.todo.value['animal'],
      sexo: this.todo.value['sexo'],
      raca: this.todo.value['raca'],
      quantidade: this.todo.value['quantidade'],
      telefone: this.todo.value['telefone'],
      cidade: this.todo.value['cidade'],
      descricao: this.todo.value['descricao'],
      urlPhoto: this.todo.value['animal'] == "Cachorro" ? "https://firebasestorage.googleapis.com/v0/b/meadote-96eb7.appspot.com/o/dog.png?alt=media&token=7b3546b6-490e-46d2-8ba6-edc070e6c8f7" : "https://firebasestorage.googleapis.com/v0/b/meadote-96eb7.appspot.com/o/cat.png?alt=media&token=22d52107-644c-4d1c-88e2-d4c77a914223"
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

  public discover(animal: any):any{
    let url
    if(animal == "Cachorro"){
      let url = "https://firebasestorage.googleapis.com/v0/b/meadote-96eb7.appspot.com/o/dog.png?alt=media&token=7b3546b6-490e-46d2-8ba6-edc070e6c8f7"
    }
    else{
      let url = "https://firebasestorage.googleapis.com/v0/b/meadote-96eb7.appspot.com/o/cat.png?alt=media&token=22d52107-644c-4d1c-88e2-d4c77a914223"
    }
    return url
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdPage');
  }

}
