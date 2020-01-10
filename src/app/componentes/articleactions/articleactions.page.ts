import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Registro } from '../../models/registro';



@Component({
  selector: 'app-articleactions',
  templateUrl: './articleactions.page.html',
  styleUrls: ['./articleactions.page.scss'],
})

export class ArticleactionsPage implements OnInit, AfterViewInit {

  article: any;
  el: any;
  toast: any;

  constructor(
    private _navparams: NavParams,
    private _modal: ModalController,
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private renderer: Renderer,
    private elem: ElementRef,
    // private registro: Registro
  ) { }

  ngOnInit() {
    this.article = this._navparams.get('article');
    console.log(this.article);
    this.el = window.document.querySelectorAll('.custom-toast');
  }

  ngAfterViewInit() {
    // you'll get your through 'elements' below code
    this.el = this.elem.nativeElement.querySelectorAll('.custom-toast');
    console.log(this.el);
    this.el[0].this.addEventListener('click', () => {
      this.toast.close();
    });
  }


  closeArticleActions() {
    this._modal.dismiss();
  }

  async presentToast(message: string) {
    this.toast = await this.toastController.create({
      message,
      animated: true,
      position: 'middle',
      duration: 30000,
      keyboardClose: true,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: ['custom-toast'],
      color: 'success'
    });
    this.toast.present();
  }



  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      const registro = new Registro(barcodeData.format, barcodeData.text);
      // this.presentToast(JSON.stringify(barcodeData));
      console.log('Barcode data', barcodeData);
      console.log('BarCode Type', registro.type);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}