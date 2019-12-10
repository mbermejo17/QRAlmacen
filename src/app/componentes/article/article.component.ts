import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { ArticlesService } from '../../servicios/articles.service';

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
    private modal: ModalController,
  ) { }

  ngOnInit() {
    this.articleservice.getArticle(this.art).subscribe(data =>{
      console.log(data);
      this.article = data;
    });
    this.art = this.navparams.get('art');
    this.articles = this.navparams.get('articles');
  }


  closeArticle() {
    this.modal.dismiss()
  }

}
