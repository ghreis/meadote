import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAdPage } from './edit-ad';

@NgModule({
  declarations: [
    EditAdPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAdPage),
  ],
})
export class EditAdPageModule {}
