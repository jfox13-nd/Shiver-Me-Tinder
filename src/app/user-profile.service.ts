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
  public getAllProfiles() {
    const Stores = Parse.Object.extend(this.databaseEndpoint);
    const query = new Parse.Query(Stores);
    return query.find();
  }

  /**
   * Create a new user profile
   */
  public createProfile(description: string, username: string, password: string, name: string, profileImage: string): void{
    const profile = Parse.Object.extend(this.databaseEndpoint);
    const newProfile = new profile();
    newProfile.set('description', description);
    newProfile.set('username', username);
    newProfile.set('password', password);
    newProfile.set('yarrs', []);
    newProfile.set('narrs', []);
    newProfile.set('name', name);
    newProfile.set('profileImage', profileImage);

    newProfile.save().then(
      (result) => {
        console.log('Profile created: ', result);
      },
      (error) => {
        console.error('Error while creating profile: ', error);
      }
    );
  }

}
