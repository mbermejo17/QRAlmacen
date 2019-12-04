import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
import { ModalController } from '@ionic/angular';
import { ArticleComponent } from '../componentes/article/article.component';
import { ArticlesService } from '../servicios/articles.service';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];
  public articles: any = [];

  constructor(
    public authservice: AuthService,
    public chatservice: ChatsService,
    public articleservice: ArticlesService,
    public actionSheetController: ActionSheetController,
    private modal: ModalController) { }

  Onlogout() {
    this.authservice.logout();
  }

  ngOnInit() {
    this.articleservice.getArticles().subscribe( data => {
      this.articles = data;
      console.log('data: ',data);
    });
    /* this.chatservice.getChatRooms().subscribe(chats => {
      this.chatRooms = chats;
    }); */
  }

  openArticle(art) {
    console.log(art._id);
    this.modal.create({
      component: ArticleComponent,
      componentProps: {
        art: art._id
      }
    }).then((modal) => modal.present())
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
      }]
    });
    await actionSheet.present();
  }
}
