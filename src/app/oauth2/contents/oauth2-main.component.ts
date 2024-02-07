import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Oauth2Service} from "../service/oauth2.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-oauth2-main',
  templateUrl: './oauth2-main.component.html',
  styleUrls: ['./oauth2-main.component.scss'],
})
export class Oauth2MainComponent  implements OnInit {

  form:any = FormGroup;
  constructor(private authService: Oauth2Service,
              private router: Router,
              private fb: FormBuilder,
              private alertController: AlertController) { }

  ngOnInit() {
    this.fielReactive();
  }

  private fielReactive() {
    const controls = {
      email: ['carlos2@gmaiassssssssss.com.pe', Validators.required],
      password: ['Abc123', Validators.required],
    }
    this.form = this.fb.group(controls);
  }

  login() {
    const forms = this.form.value;
    this.authService.login(this.form.value).subscribe((res: any) => {

      this.router.navigateByUrl('/')
        console.log(res)
    },(err) => {
      /*this.presentAlert(err.error.message);*/

    } )
  }


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
