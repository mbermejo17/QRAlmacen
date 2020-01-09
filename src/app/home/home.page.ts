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


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];
  public articles: any = [];
  public models: any = [];
  // tslint:disable-next-line: no-inferrable-types
  plattformcordova: boolean = false;
  isLoading = false;
  registro: Registro;

  constructor(
    public authservice: AuthService,
    public chatservice: ChatsService,
    public articleservice: ArticlesService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private modal: ModalController,
    private barcodeScanner: BarcodeScanner,
    private router: Router) {
  }

  Onlogout() {
    this.authservice.logout();
  }

  ngOnInit() {
    this.loadingController.dismiss();
    if (!this.isLoading) { this.presentLoading(); }
    if (window.cordova) { this.plattformcordova = true; }
    // this.loadingController.create();
    this.articleservice.getTotalArticlesByModel().subscribe(data => {
      this.models = data;
      console.log('data: ', data);
      if (data) {
        this.loadingController.dismiss();
        this.isLoading = false;
      }
    });
    /* this.chatservice.getChatRooms().subscribe(chats => {
      this.chatRooms = chats;
    }); */
  }

  openArticle(art) {
    console.log('Modelo seleccionado: ', art);
    if (art.Total > 0) {
      if (!this.isLoading) { this.presentLoading(); }
      console.log(art);
      this.articleservice.getArticlesByModel(art.Name).subscribe(data => {
        this.articles = data;
        console.log('data: ', data);
        if (this.isLoading) {
          this.loadingController.dismiss();
          this.isLoading = false;
        }
        this.modal.create({
          component: ArticleComponent,
          componentProps: {
            art: art.Name,
            articles: data
          }
        }).then((modal) => modal.present());
      });
    }
  }


  Scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.registro = new Registro(barcodeData.format, barcodeData.text);
      // this.presentToast(JSON.stringify(barcodeData));

      console.log('BarCode Type', this.registro.type);
      if (this.registro.type === 'Location' || this.registro.type === 'Article') {
        this.OpenModalInfo(this.registro);
      }

    }
    ).catch(err => {
      console.log('Error', err);
    });
  }


  OpenModalInfo(d: Registro) {
    console.log('Tipo Scaneado: ', d);
    if (d.type === 'Location') {
      const code = JSON.parse(d.text);
      if (!this.isLoading) { this.presentLoading(); }
      this.articleservice.getArticlesByLocation(code.Data).subscribe(data => {
        this.articles = data;
        console.log('data: ', data);
        if (data) {
          this.loadingController.dismiss();
          this.isLoading = false;
        }
        this.modal.create({
          component: ArticleComponent,
          componentProps: {
            art: code.Data,
            articles: data
          }
        }).then((modal) => modal.present())
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
