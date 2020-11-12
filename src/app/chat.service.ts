import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // back4app database endpoint
  private readonly databaseEndpoint = 'chat';
  private readonly messageEndpoint = 'message';

  constructor(private http: HttpClient) {}

  /**
   * Query all profiles from back4app database
   */
  public getAllChats(){
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    return query.find();
  }

  /**
   * Console log all chats
   */
  public logAllChats(){
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    return query.find().then( (results) => {
      console.log(results);
    });
  }

  public getChatByID(id) {
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    return query.get(id);
  }

  public sendMessage(chat_id, message_text, sender) {
    const message = Parse.Object.extend(this.messageEndpoint);
    const newMessage = new message();
    newMessage.set('chat', { __type: 'Pointer', className: 'chat', objectId: chat_id });
    newMessage.set('sender', sender);
    newMessage.set('content', message_text);
    return newMessage.save()
  }

  public getAllMessages(chat_id) {
    const Stores = Parse.Object.extend(this.messageEndpoint);
    const query = new Parse.Query(Stores);
    query.ascending('createdAt');
    query.equalTo('chat', { __type: 'Pointer', className: 'chat', objectId: chat_id });
    return query.find();
  }
}
