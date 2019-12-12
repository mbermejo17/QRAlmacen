import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeechSearchPage } from './speech-search.page';

const routes: Routes = [
  {
    path: '',
    component: SpeechSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeechSearchPageRoutingModule {}
