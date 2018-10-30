import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocationPage } from '../pages/location/location';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AccountPage } from '../pages/account/account';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { AddAdPage } from '../pages/add-ad/add-ad';
import { EditAdPage } from '../pages/edit-ad/edit-ad';
import { ViewAdPage } from '../pages/view-ad/view-ad';


import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { Camera } from '@ionic-native/camera';
import { LocationServiceProvider } from '../providers/location-service/location-service';

const config = {
  apiKey: "AIzaSyAhB9BNpQzdKPj1PeWuJ2pWrW-jmF50buQ",
  authDomain: "meadote-96eb7.firebaseapp.com",
  databaseURL: "https://meadote-96eb7.firebaseio.com",
  projectId: "meadote-96eb7",
  storageBucket: "meadote-96eb7.appspot.com",
  messagingSenderId: "314934113649"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ChangePasswordPage,
    AddAdPage,
    EditAdPage,
    ViewAdPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocationPage,
    LoginPage,
    RegisterPage,
    AccountPage,
    ChangePasswordPage,
    AddAdPage,
    EditAdPage,
    ViewAdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    LocationServiceProvider
  ]
})
export class AppModule {}
