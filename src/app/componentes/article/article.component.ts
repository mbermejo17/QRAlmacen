import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ArticlesService } from '../../servicios/articles.service';
import { ArticleactionsPage } from '../articleactions/articleactions.page';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  public art: any;
  public article: any;
  public articles: any = [];

  constructor(
    private articleservice: ArticlesService,
    private navparams: NavParams,
    private _modal: ModalController
  ) { }

  ngOnInit() {
    /*  this.articleservice.getArticle(this.art).subscribe(data =>{
       console.log(data);
       this.article = data;
     }); */
    this.art = this.navparams.get('art');
    this.articles = this.navparams.get('articles');
  }

  onClickShowActions(artObj) {
    this._modal.create({
      component: ArticleactionsPage,
      componentProps: {
        art: artObj.Name,
        article: artObj
      }
    }).then((modal) => modal.present());
  }

  closeArticle() {
    this._modal.dismiss();
  }

}
