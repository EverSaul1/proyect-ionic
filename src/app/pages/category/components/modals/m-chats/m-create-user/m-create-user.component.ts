import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-create-user',
  templateUrl: './m-create-user.component.html',
  styleUrls: ['./m-create-user.component.scss'],
})
export class MCreateUserComponent  implements OnInit {

  form:any = FormGroup;
  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private toastController: ToastController,
              private fb: FormBuilder,) { }

  ngOnInit() {
    this.fielReactive()
  }

  private fielReactive() {
    const controls = {
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
    }
    this.form = this.fb.group(controls);
  }
  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  addStorageuser(){
    const form = this.form.value;
    const parmas = {
      email: form.email,
      nombre: form.nombre,
      avatar: 'hockey'
    }
    this.storage.set('user', parmas);
    this.modalCtrl.dismiss(null, 'confirm');
  }

  async presentToast(mjs: string, color: string) {
    const toast = await this.toastController.create({
      message: mjs,
      duration: 1500,
      color: color,
      position: 'bottom',
    });

    await toast.present();
  }
}
