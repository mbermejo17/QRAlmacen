import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() { }

  onSubmitLogin() {
    const usuario = new User(null, this.email, this.password);

    this.authService.login(usuario, true)
    .subscribe( resp => {
      if (resp.ok) {
        this.authService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        this.router.navigate(['/home']);
      } 
    }, error =>{
       console.log( error);
    });
  }

}
