import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  usuario: User;
  token: string;
  menu: any[] = [];
  ApiURL = environment.ApiURL;

  constructor(
    private router: Router,
    public http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuario')));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  guardarStorage(id: string, token: string, usuario: User, menu: any) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
      resolve();
    });

  }

  borrarStorage() {
    localStorage.clear();

    this.token = '';
    this.menu = [];
  }

  login(usuario: User, recordar: boolean = false) {


    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    // let url = URL_SERVICIOS + '/login';
    console.log(this.ApiURL);
    const url = this.ApiURL + '/login';
    return this.http.post<any>(url, usuario);
    /* .pipe(
      tap((resp: any) => {
        if (resp.ok) {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        } else {
          return false;
        }
      }
      ))
    .catch((err) => {
      // swal('Error en el login', err.error.mensaje, 'error');
      return throwError(err);
    }); */
    /*  .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); */
  }
  logout() {
    this.borrarStorage();
    this.router.navigate(['/login']);
  }

  register(email: string, password: string, name: string) {

    return {};
  }

}
