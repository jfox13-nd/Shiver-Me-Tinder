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
  user_data;
  /*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  */
  constructor(private http: HttpClient) { 
    this.prepUsers()
  }

  prepUsers() {
    //this.http.get(this.usersUrl).subscribe(data => console.log(data));
    //return this.http.get(this.usersUrl).map(res =? resizeBy.json())
    //this.http.get(this.usersUrl).subscribe(data => {this.user_data = data;});

  }

  getUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.usersUrl)
  }

  
}
