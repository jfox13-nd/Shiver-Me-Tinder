import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from './user-profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly usersUrl = '../assets/user_database.json';  // URL to web api
  userData;

  constructor(private http: HttpClient) {
    this.prepUsers();
  }

  prepUsers() {
    this.userData = this.http.get<UserProfile[]>(this.usersUrl);
  }

  getUsers(): Observable<UserProfile[]> {
    return this.userData;
  }


}
