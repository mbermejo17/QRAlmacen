import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';

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
    public router: Router
  ) { }

  ngOnInit() { }

 async onSubmitLogin(fLogin: NgForm ) {
    console.log(fLogin);
    this.loginUser.email = fLogin.form.value.email;
    this.loginUser.password =  fLogin.form.value.password;
    await this.authService.login( this.loginUser , true)
      .subscribe(resp => {
        if (resp.ok) {
          this.authService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu)
          .then(() =>{
            // this.navCtrl.navigateRoot( '/app/home', { animated: true } );
             this.router.navigate(['/home']);
          });
        }
      }, error => {
        console.log(error);
      });
  }

}
