import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  usuario: User;
  token: string;
  menu: any[] = [];

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    public http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usuario')));
   }

    public get currentUserValue(): User {
    return this.currentUserSubject.value;
}


 guardarStorage(id: string, token: string, usuario: User, menu: any) {

  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  localStorage.setItem('menu', JSON.stringify(menu));

  this.usuario = usuario;
  this.token = token;
  this.menu = menu;
}

login(usuario: User, recordar: boolean = false) {


  if (recordar) {
    localStorage.setItem('email', usuario.email);
  } else {
    localStorage.removeItem('email');
  }

  // let url = URL_SERVICIOS + '/login';
  const url = 'http://localhost:3000/login';
  return this.http.post<any>(url, usuario)
    .pipe(
      tap((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }
      ))
    .catch((err) => {
      // swal('Error en el login', err.error.mensaje, 'error');
      return throwError(err);
    });
}

logout() {
  this.AFauth.auth.signOut().then(() => {
    this.router.navigate(['/login']);
  });
}

register(email: string, password: string, name: string) {

  return new Promise((resolve, reject) => {
    this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      // console.log(res.user.uid);
      const uid = res.user.uid;
      this.db.collection('users').doc(uid).set({
        name,
        uid
      });

      resolve(res);
    }).catch(err => reject(err));
  });


}



}
