import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-speech-search',
  templateUrl: './speech-search.component.html',
  styleUrls: ['./speech-search.component.scss'],
})
export class SpeechSearchComponent implements OnInit {

  message: string;

  constructor(
    public navCtrl: NavController,
    private speechRecognition: SpeechRecognition
  ) { }

  ngOnInit() { }

  ionViewDidLoad() {
    this.getPermission();
  }

  // Esta función es la encargada de activar el reconocimiento de voz
  startListening() {
    const options = {
      language: 'es-ES', // fijamos el lenguage
      matches: 1, // Nos devuelve la primera opción de lo que ha escuchado
      // si ponemos otra cantidad, nos dará una variante de la palabra/frase que le hemos dicho
    };
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.message = matches[0]; // Guarda la primera frase que ha interpretado en nuestra variable

    });
  }

  getPermission() {
    // comprueba que la aplicación tiene permiso, de no ser así nos la pide
    this.speechRecognition.hasPermission().
      then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

}
