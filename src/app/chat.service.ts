import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Parse from 'parse';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'bSVUoDYZEaY0WB8XJ0GRHU50bD7PJ3d5nYx8vUMa', // This is your Application ID
  '88WTwyNC16ZE8mnu57gDMAj2kNKBjRNdtTAx6CHe' // This is your Javascript key
);


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // back4app database endpoint
  private readonly databaseEndpoint = "chat";

  constructor(private http: HttpClient) {}

  /**
   * Query all profiles from back4app database
   */
  public getAllChats(){
    var Stores = Parse.Object.extend(this.databaseEndpoint);
    var query = new Parse.Query(Stores);
    return query.find();
  }

  /**
   * Console log all chats
   */
  public logAllChats(){
    var Stores = Parse.Object.extend(this.databaseEndpoint);
    var query = new Parse.Query(Stores);
    return query.find().then(function(results) {
      console.log(results);
    });
  }
}
