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
  public getAllChats(): any{
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

  /**
   * finds and returns the chat id of the current user and any other user and the chat is not in the waiting stage
   * this means that the likedid (other user) has already been liked or disliked by the current user and is used in
   * either displaying or not the profile.  (It works trust me)
   */
  public getChatbyUser(likedid){
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    query.equalTo('userA', { __type: 'Pointer', className: '_User', objectId: likedid});
    query.equalTo('userB', Parse.User.current());
    query.notEqualTo('activeChat', 'wait');
    query.find().then((results) => {
    }, (error) => {
      console.error('Error while fetching chat', error);
    });
    return query.find();
  }

  public sendMessage(chatId, messageText, sender) {
    const message = Parse.Object.extend(this.messageEndpoint);
    const newMessage = new message();
    newMessage.set('chat', { __type: 'Pointer', className: 'chat', objectId: chatId });
    newMessage.set('sender', sender);
    newMessage.set('content', messageText);
    return newMessage.save();
  }

  public getAllMessages(chatId) {
    const Stores = Parse.Object.extend(this.messageEndpoint);
    const query = new Parse.Query(Stores);
    query.ascending('createdAt');
    query.equalTo('chat', { __type: 'Pointer', className: 'chat', objectId: chatId });
    return query.find();
  }
}
