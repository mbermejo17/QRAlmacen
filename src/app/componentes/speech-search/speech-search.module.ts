import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeechSearchPageRoutingModule } from './speech-search-routing.module';

import { SpeechSearchPage } from './speech-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeechSearchPageRoutingModule
  ],
  declarations: [SpeechSearchPage]
})
export class SpeechSearchPageModule {}
