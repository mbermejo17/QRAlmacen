import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../componentes/article/article.component';
import { ArticlesService } from '../servicios/articles.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Registro } from '../models/registro';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];
  public articles: any = [];
  public models: any = [];
  public articlesTotal = 0;
  // tslint:disable-next-line: no-inferrable-types
  plattformcordova: boolean = false;
  isLoading = false;
  registro: Registro;
  locationMode = false;
  toast: any;
  public lastLocation = '';
  public totalModels = 0;

  constructor(
    public authservice: AuthService,
    public chatservice: ChatsService,
    public articleservice: ArticlesService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private modal: ModalController,
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private router: Router) {
  }

  Onlogout() {
    this.authservice.logout();
  }

  async presentToast(message: string) {
    this.toast = await this.toastController.create({
      message,
      animated: true,
      position: 'middle',
      duration: 5000,
      keyboardClose: true,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: ['custom-toast'],
      color: 'success'
    });
    this.toast.present();
  }

  goHome() {
    const promise = this.articleservice.getTotalArticlesByModel().toPromise();
    promise.then((data) => {
      this.models = data;
      console.log('data: ', this.models);
      if (data) {
        this.loadingController.dismiss();
        this.isLoading = false;
      }
    });
    this.articleservice.getTotalArticlesByModel().subscribe(data => {
      this.models = data;
      console.log('data: ', this.models);
      if (data) {
        this.loadingController.dismiss();
        this.isLoading = false;
      }
    });

  }

  ngOnInit() {
    this.loadingController.dismiss();
    this.locationMode = false;
    // if (!this.isLoading) { this.presentLoading(); }
    if (window.cordova) { this.plattformcordova = true; }
    this.goHome();
  }

  openArticle(art) {
    let name = '';
    let total = 0;
    if (this.locationMode === true) {
      name = art._id.PartNumber;
      total = art.count;
      if (total > 0) {
        // if (!this.isLoading) { this.presentLoading(); }
        console.log(art);
        this.articleservice.getArticlesByModelLocation(name, art._id.Location).subscribe(data => {
          this.articles = data;
          this.articlesTotal = data.length;
          console.log('data: ', data);
          if (this.isLoading) {
            this.loadingController.dismiss();
            this.isLoading = false;
          }
          this.modal.create({
            component: ArticleComponent,
            componentProps: {
              art: name,
              articles: data,
              articlesTotal: data.length
            }
          }).then((modal) => modal.present());
        });
      } else {
        this.goHome();
      }
    } else {
      name = art.Name;
      total = art.Total;
      if (total > 0) {
        // if (!this.isLoading) { this.presentLoading(); }
        console.log(art);
        this.articleservice.getArticlesByModel(name).subscribe(data => {
          this.articles = data;
          this.articlesTotal = data.length;
          console.log('data: ', data);
          if (this.isLoading) {
            this.loadingController.dismiss();
            this.isLoading = false;
          }
          this.modal.create({
            component: ArticleComponent,
            componentProps: {
              art: name,
              articles: data,
              articlesTotal: data.length
            }
          }).then((modal) => modal.present());
        });
      } else {
        this.goHome();
      }
    }
    console.log('Modelo seleccionado: ', art);
  }


  Scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode', barcodeData);
      this.registro = new Registro(barcodeData.format, barcodeData.text);
      // this.presentToast(JSON.stringify(barcodeData));

      console.log('Registro: ', this.registro);
      if (this.registro.type === 'Location' || this.registro.type === 'Article' || this.registro.type === 'Factory') {
        this.OpenModalInfo(this.registro);
      }

    }
    ).catch(err => {
      console.log('Error', err);
    });
  }

  goBack(){
    this.models = [];
    this.locationMode = false;
    this.goHome();
  }


  async OpenModalInfo(d: Registro) {
    console.log('Tipo Scaneado: ', d);
    if (d.type === 'Location') {
      this.locationMode = true;
      const code = JSON.parse(d.text);
      this.lastLocation = code.Data;
      const data = await this.articleservice.getModelsByLocation(code.Data);
      
        // this.articles = data;
        // this.articlesTotal = data.lenght;
        this.totalModels = data.articles.length;
        console.log('============== total =========', this.totalModels);
        if (this.totalModels === 0) {
          this.locationMode = false;
          this.models = [];
          this.presentToast('No se encuetran articulos');
          this.goHome();
        } else {
          this.models = data.articles;
        }

        console.log('Total modelos: ', this.totalModels);
      
    }
    if (d.type === 'Factory') {
      let modelName = '';
      if (d.format === '') {
        modelName = d.text;
      }
      this.articleservice.getArticlesContains(d.text).subscribe(data => {
        this.articles = data;
        this.articlesTotal = data.length;
        this.modal.create({
          component: ArticleComponent,
          componentProps: {
            art: d.text,
            articles: data,
            articlesTotal: this.articlesTotal
          }
        }).then((modal) => {
          this.loadingController.dismiss();
          this.isLoading = false;
          return modal.present();
        })
          .catch(err => {
            console.log(err);
            this.loadingController.dismiss();
            this.isLoading = false;
          });
      });
    }
  }

  goToSearchPage() {
    this.router.navigate(['/buscar']);
  }

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        },
      },
      {
        text: 'Scan Code',
        role: 'destructive',
        icon: 'md-barcode',
        handler: () => {
          this.Scan();
        },
      }]
    });
    await actionSheet.present();
  }
}
