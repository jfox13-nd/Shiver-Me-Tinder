import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from './user-profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


}
