import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-perfil',
  templateUrl: './m-perfil.component.html',
  styleUrls: ['./m-perfil.component.scss'],
})
export class MPerfilComponent  implements OnInit {

  @Input() user: any;
  @Input() id!: string;
  formData: any = FormGroup;
  url: string = './assets/icon';
  avatares: any = [
    {
      id: 1,
      name: 'asesino',
      url: this.url + '/asesino.png'
    },
    {
      id: 2,
      name: 'frankenstein',
      url: this.url + '/frankenstein.png'
    },
    {
      id: 3,
      name: 'reales',
      url: this.url + '/reales.png'
    },
    {
      id: 4,
      name: 'hockey',
      url: this.url + '/hockey.png'
    },
    {
      id: 5,
      name: 'japones',
      url: this.url + '/japones.png'
    },
    {
      id: 6,
      name: 'dracula',
      url: this.url + '/dracula.png'
    }
  ]

  constructor(private modalCtrl: ModalController,
              private toastController: ToastController,
              private storage: Storage,
              private fb: FormBuilder,) { }

  ngOnInit() {
    this.formBuilder();
  }
  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }
  private formBuilder() {
    const form = {
      email: ['', Validators.required],
      user: ['', Validators.required],
      avatar: ['reales', Validators.required]
    };

    this.formData = this.fb.group(form);
    if(this.user !== 'NA'){
      this.formData.controls['email'].setValue(this.user.email);
      this.formData.controls['user'].setValue(this.user.nombre);
      this.formData.controls['avatar'].setValue(this.user.avatar);
    }
  }

  selectAvatar(item: any) {
    this.formData.controls['avatar'].setValue(item.name);
  }

  async actualizar(){

    const form = this.formData.value;
    const params = {
      email: form.email,
      nombre: form.user,
      avatar: form.avatar
    }
    console.log(params)
    await this.storage.set('user', params);
    this.presentToast('Se realizo los cambios correctamente', 'success')
    await this.modalCtrl.dismiss(params, 'confirm');
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
