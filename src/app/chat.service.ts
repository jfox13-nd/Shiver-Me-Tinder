import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // back4app database endpoint
  private readonly databaseEndpoint = 'chat';

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
}
