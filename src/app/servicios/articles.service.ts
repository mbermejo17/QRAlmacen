import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../models/article.model';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  article: Article;
  ApiUrl = environment.ApiURL;

  constructor(
    public http: HttpClient
  ) { }

  getArticles() {
    const url = this.ApiUrl + '/article?limite=900';
    return this.http.get<any>(url)
      .map((data: any) => data.articles);
  }

  getArticle(id) {
    const url = this.ApiUrl + '/article/';
    return this.http.get<any>(url + id)
      .map((data: any) => data.articulo);
  }

  getTotalArticlesByModel() {
    const url = this.ApiUrl + '/model/total';
    return this.http.get<any>(url)
      .map((data: any) => data.models);
  }
  getArticlesByModel(id) {
    const url = this.ApiUrl + '/model/articles/';
    console.log(id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }
  getArticlesByLocation(id) {
    const url = this.ApiUrl + '/article/location/';
    console.log(id);
    console.log(url + id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }

  getModelsByLocation(id) {
    const url = this.ApiUrl + '/model/location/';
    console.log(id);
    console.log(url + id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }

  getArticlesContains(id) {
    const url = this.ApiUrl + '/article/contains/';
    console.log(id);
    console.log(url + id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }
}
