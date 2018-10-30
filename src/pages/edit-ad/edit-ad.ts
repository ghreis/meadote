import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountPage } from '../account/account';

//@IonicPage()
@Component({
  selector: 'page-edit-ad',
  templateUrl: 'edit-ad.html',
})
export class EditAdPage {

  public ad: any
  private todo: FormGroup
  localidades: any;
  namePhoto: any;
  urlDownload: Observable<string | null>;
  myPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, private formBuilder: FormBuilder, public http: HttpClient, private camera: Camera, private storage: AngularFireStorage) {

    this.getAllLocations();

    this.ad = this.navParams.data.ad || {}
    this.myPhoto = this.ad.urlPhoto
    this.namePhoto = this.ad.nameFile

    this.todo = this.formBuilder.group({
      titulo: [this.ad.titulo],
      animal: [{ value: this.ad.animal, disabled: true }],
      sexo: [this.ad.sexo],
      raca: [{ value: this.ad.raca, disabled: true }],
      quantidade: [this.ad.quantidade],
      telefone: [this.ad.telefone],
      cidade: [this.ad.cidade],
      descricao: [this.ad.descricao]
    });
  }

  pictureFromGalery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      if (this.namePhoto != this.ad.nameFile) {
        this.storage.ref(this.namePhoto).delete();
        let filePath = `anuncios/my-pet_${new Date().getTime()}.jpg`;
        this.namePhoto = filePath
        this.storage.ref(filePath).putString(this.myPhoto, 'data_url').then(() => {
          const ref = this.storage.ref(filePath);
          ref.getDownloadURL().subscribe(ref => {
            this.urlDownload = ref
          })
        })
      }
      else {
        let filePath = `anuncios/my-pet_${new Date().getTime()}.jpg`;
        this.namePhoto = filePath
        this.storage.ref(filePath).putString(this.myPhoto, 'data_url').then(() => {
          const ref = this.storage.ref(filePath);
          ref.getDownloadURL().subscribe(ref => {
            this.urlDownload = ref
          })
        })
      }

    }, (err) => {
      // Handle error
    });

  }

  public editAd(): void {

    if (this.myPhoto != this.ad.urlPhoto) {
      let anuncio = {
        titulo: this.todo.value['titulo'],
        sexo: this.todo.value['sexo'],
        quantidade: this.todo.value['quantidade'],
        telefone: this.todo.value['telefone'],
        cidade: this.todo.value['cidade'],
        descricao: this.todo.value['descricao'],
        nameFile: this.namePhoto,
        urlPhoto: this.urlDownload
      }

      this.storage.ref(this.ad.nameFile).delete();
      this.db.collection('anuncios').doc(this.ad.idAd).update(anuncio)
        .then((ref => {
          this.navCtrl.setRoot(AccountPage)
        }))
    }
    else {
      let anuncio = {
        titulo: this.todo.value['titulo'],
        sexo: this.todo.value['sexo'],
        quantidade: this.todo.value['quantidade'],
        telefone: this.todo.value['telefone'],
        cidade: this.todo.value['cidade'],
        descricao: this.todo.value['descricao']
      }
      this.db.collection('anuncios').doc(this.ad.idAd).update(anuncio)
        .then((ref => {
          this.navCtrl.setRoot(AccountPage)
        }))
    }
  }

  getAllLocations() {
    let data: Observable<any>
    data = this.http.get(`http://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/35004/municipios`)
    data.subscribe(result => {
      this.localidades = result
    });
  }

  return() {

    if (this.myPhoto != this.ad.urlPhoto) {
      this.storage.ref(this.namePhoto).delete();
      this.navCtrl.setRoot(AccountPage);
    }
    else {
      this.navCtrl.setRoot(AccountPage)
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAdPage');
  }

}
