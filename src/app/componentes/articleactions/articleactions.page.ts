import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController  } from "@ionic/angular";

@Component({
  selector: 'app-articleactions',
  templateUrl: './articleactions.page.html',
  styleUrls: ['./articleactions.page.scss'],
})
export class ArticleactionsPage implements OnInit {
  
  article: any;
  constructor(
    private navparams: NavParams,
    private _modal: ModalController
  ) { }



  ngOnInit() {
    this.article = this.navparams.get('article');
    console.log(this.article);
  }

  closeArticleActions() {
    this._modal.dismiss()
  }
 
}
