import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { message } from '../models/message';

export interface chat {
  description: string;
  name: string;
  id: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor() { }


  getChatRooms(){
        return {};
  }

  getChatRoom( chatId : string){
    return {chatId};
  }


}
