import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ChatComponent } from './componentes/chat/chat.component';
import { ArticleComponent } from './componentes/article/article.component';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';



@NgModule({
  declarations: [AppComponent, ChatComponent, ArticleComponent],
  entryComponents: [ ChatComponent, ArticleComponent],
  imports: [FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
