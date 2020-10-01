import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  // back4app database endpoint
  private readonly databaseEndpoint = 'profile';

  constructor(private http: HttpClient) {}

  /**
   * Query all profiles from back4app database
   */
  public getAllProfiles(){
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    return query.find();
  }

}
