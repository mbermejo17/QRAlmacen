import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeechSearchComponent } from './speech-search.component';

const routes: Routes = [
  {
    path: '',
    component: SpeechSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeechSearchModule {}