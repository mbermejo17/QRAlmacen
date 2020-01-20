import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../models/article.model';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  article: Article;
  ApiUrl = environment.ApiURL;

  constructor(
    public http: HttpClient
  ) { }

  getArticles(): Observable<any> {
    const url = this.ApiUrl + '/article?limite=900';
    return this.http.get<any>(url)
      .map((data: any) => data.articles);
  }

  getArticle(id): Observable<any> {
    const url = this.ApiUrl + '/article/';
    return this.http.get<any>(url + id)
      .map((data: any) => data.articulo);
  }

  getTotalArticlesByModel(): Observable<any> {
    const url = this.ApiUrl + '/model/total';
    return this.http.get<any>(url)
      .map((data: any) => data.models);
  }
  getArticlesByModel(id): Observable<any> {
    const url = this.ApiUrl + '/model/articles/';
    console.log(id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }
  getArticlesByModelLocation(m, l): Observable<any> {
    const url = this.ApiUrl + '/model/articles/';
    console.log(m);
    return this.http.get<any>(url + m + '/location/' + l)
      .map((data: any) => data.articles);
  }
  getArticlesByLocation(id): Observable<any> {
    const url = this.ApiUrl + '/article/location/';
    console.log(id);
    console.log(url + id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }

  async getModelsByLocation(id): Promise<any> {
    const url = this.ApiUrl + '/model/location/';
    console.log(id);
    console.log(url + id);
    const result = await this.http.get<any>(url + id).toPromise();
    // .map((data: any) => {
    console.log('Data Articles: ', result);
    //  return data.articles;
    // });
    return result;
  }

  getArticlesContains(id): Observable<any> {
    const url = this.ApiUrl + '/article/contains/';
    console.log(id);
    console.log(url + id);
    return this.http.get<any>(url + id)
      .map((data: any) => data.articles);
  }
}
