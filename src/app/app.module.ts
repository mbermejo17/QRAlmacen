
import { ArticleactionsPage } from './componentes/articleactions/articleactions.page';
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
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';





@NgModule({
  declarations: [AppComponent, ChatComponent, ArticleComponent, ArticleactionsPage ],
  entryComponents: [ ChatComponent, ArticleComponent, ArticleactionsPage ],
  imports: [FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    SpeechRecognition,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
