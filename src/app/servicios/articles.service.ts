import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../models/article.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  article: Article;

  constructor(
    public http: HttpClient
  ) { }

  getArticles() {
    const url = 'http://localhost:3000/article?limite=900';
    return this.http.get<any>(url)
      .map((data: any) => data.articles);
  }

  getArticle(id) {
    const url = 'http://localhost:3000/article/';
    return this.http.get<any>(url + id)
      .map((data: any) => data.articulo);
  }

  getTotalArticlesByModel() {
    const url = 'http://localhost:3000/model/total';
    return this.http.get<any>(url)
      .map((data: any) => data.models);
  }
  getArticlesByModel(id) {
    const url = 'http://localhost:3000/model/articles/';
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }

}
