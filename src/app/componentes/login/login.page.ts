import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public email = '';
  public password = '';
  loginUser = new User(null, '', '', '') ;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private _router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  async presentToast(message:string ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      animated: true,
      cssClass: ['custom-toast'],
      color: 'danger'
    });
    toast.present();
  } 

 async onSubmitLogin(fLogin: NgForm ) {
    console.log(fLogin);
    this.loginUser.email = fLogin.form.value.email;
    this.loginUser.password =  fLogin.form.value.password;
    await this.authService.login( this.loginUser , true)
      .subscribe(resp => {
        if (resp.ok) {
          this.authService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu)
          .then(() => {
             console.log('OK');
            // this.navCtrl.navigateRoot( '/app/home', { animated: true } );
             this._router.navigate(['home']);
          })
          .catch((err) => {
            this.presentToast(err);
            console.log(err)
          });
        }
      }, error => {
        this.presentToast(error.statusText);
        console.log("Error:",error);
      });
  }

}
