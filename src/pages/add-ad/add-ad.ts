import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountPage } from '../account/account'
import { AlertController } from 'ionic-angular'

//@IonicPage()
@Component({
  selector: 'page-add-ad',
  templateUrl: 'add-ad.html',
})
export class AddAdPage {

  private todo: FormGroup
  myPhoto: any;
  localidades: any;
  urlDownload: Observable<string | null>;
  namePhoto: any;

  constructor(public alertCtrl: AlertController, public db: AngularFirestore, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public afAuth: AngularFireAuth, private camera: Camera, private storage: AngularFireStorage, public http: HttpClient) {

    this.getAllLocations();

    this.myPhoto = "https://bit.ly/2CLWkNr"
    this.namePhoto = "semFoto.png"

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

  pictureFromGalery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      if (this.namePhoto == "semFoto.png") {
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

    }, (err) => {
      // Handle error
    });
  }

  public addAd(): void {

    if (this.myPhoto != "https://bit.ly/2CLWkNr") {

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
        nameFile: this.namePhoto,
        urlPhoto: this.urlDownload
      }

      this.db.collection('anuncios').add(anuncio)
        .then((reff) => {
          let id = reff.id
          this.db.collection('anuncios').doc(id).update({ idAd: id })
            .then(() => {
              this.navCtrl.setRoot(AccountPage)
            })
            .catch((error) => {
            })
        })
        .catch((error) => {
        })
    }
    else {
      this.presentAlertPhoto()
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
    if (this.namePhoto === "semFoto.png") {
      this.navCtrl.setRoot(AccountPage)
    }
    else {
      this.storage.ref(this.namePhoto).delete()
      this.navCtrl.setRoot(AccountPage)
    }

  }

  presentAlertPhoto() {
    let alert = this.alertCtrl.create({
      title: 'Alerta !',
      subTitle: 'É necessário adicionar uma foto!',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAdPage');
  }

}
