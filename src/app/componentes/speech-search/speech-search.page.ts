import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-speech-search',
  templateUrl: './speech-search.page.html',
  styleUrls: ['./speech-search.page.scss']
})
export class SpeechSearchPage implements OnInit {

  plattformcordova = false;
  message: string;
  title: string;
  searchText: string;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.searchText = '';
    if (window.cordova) {
      this.title = 'Busqueda por voz';
      this.plattformcordova = true;
    } else {
      this.title = 'Busqueda global';
      this.plattformcordova = false;
    }
  }
  ionViewDidLoad() {
    this.getPermission();
  }

  // Esta función es la encargada de activar el reconocimiento de voz
  startListening() {
    if (window.cordova) {
      const options = {
        language: 'es-ES', // fijamos el lenguage
        matches: 1,
        showPartial: true
        // Nos devuelve la primera opción de lo que ha escuchado
        // si ponemos otra cantidad, nos dará una variante de la palabra/frase que le hemos dicho
      };
      this.speechRecognition.startListening(options).subscribe(matches => {
        this.message = matches[0]; // Guarda la primera frase que ha interpretado en nuestra variable

      });
    }
  }

  startSearch( text ) {
    // globalSearch
    console.log( text );
  }

  getPermission() {
    if (window.cordova) {
      // comprueba que la aplicación tiene permiso, de no ser así nos la pide
      this.speechRecognition.hasPermission().
        then((hasPermission: boolean) => {
          if (!hasPermission) {
            this.speechRecognition.requestPermission();
          }
        });
    }
  }
  closeSearch() {
    this.router.navigate(['home']);
  }

}
