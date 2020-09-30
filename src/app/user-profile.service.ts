import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from './user-profile';
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
export class UserProfileService {

  // database URL
  private readonly usersUrl = '../assets/user_database.json';
  // object to hold user data from database0
  userData;

  constructor(private http: HttpClient) {
    this.prepUsers();
  }

  /*
  * Perform GET request to retrieve user data, save as attribute
  */
  prepUsers() {
    this.userData = this.http.get<UserProfile[]>(this.usersUrl);
  }

  /*
  * Return attribute with user data
  */
  getUsers(): Observable<UserProfile[]> {
    return this.userData;
  }

  public testParse(){
    var Stores = Parse.Object.extend("profile");
    var query = new Parse.Query(Stores);
    return query.find()
  }

}
