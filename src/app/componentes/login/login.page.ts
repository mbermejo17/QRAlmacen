import { Component, OnInit } from '@angular/core';
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
  public email: string ='';
  public password: string ='';

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() { }

  onSubmitLogin() {
    const usuario = new User(null, this.email, this.password);
<<<<<<< HEAD
    console.log(this.email, this.password);
    console.log('User Name: ' + usuario.nombre +', email: '+ usuario.email +', password: '+ usuario.password);
=======
    var self = this;
>>>>>>> 585d4c2e0d8ff6f417c09395a41690706b3ee302
    this.authService.login(usuario, true)
    .subscribe( resp => {
      if (resp.ok) {
        this.authService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        self.router.navigate(['/home']);
      } 
    }, error =>{
       console.log( error);
    });
  }

}
