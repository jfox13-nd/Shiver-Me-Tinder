import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from 'parse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  // back4app database endpoint
  private readonly databaseEndpoint = 'profile';

  constructor(private http: HttpClient, private router: Router) {}

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
  public createProfile(description: string, username: string, password: string, name: string, profileImage: string, rank: string): void{
    const profile = Parse.Object.extend(this.databaseEndpoint);
    const newProfile = new profile();
    newProfile.set('description', description);
    newProfile.set('username', username);
    newProfile.set('yarrs', []);
    newProfile.set('narrs', []);
    newProfile.set('name', name);
    newProfile.set('profileImage', profileImage);
    newProfile.set('rank', rank);

    // Create new user if new profile creation works
    newProfile.save().then(
      (result: any) => {
        console.log('Profile created: ', result);
        this.userSignup(username, password);
      },
      (error: any) => {
        console.log('Error while creating profile: ', error);
      }
    );
  }

  private userSignup(username: string, password: string): void {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    // tslint:disable-next-line:no-shadowed-variable
    user.signUp().then((user: any) => {
      if (typeof document !== 'undefined') { }
      console.log('User signed up', user);
      this.router.navigate(['home-page']);
    }).catch((error: any) => {
      if (typeof document !== 'undefined') { document.write(`Error while signing up user: ${JSON.stringify(error)}`); }
      console.log('Error while signing up user', error);
    });
  }

  /**
   * Check if there is already a logged in user
   */
  public checkLogin(): boolean {
    const currentUser = Parse.User.current();
    console.log(currentUser);
    if (currentUser) {
      return true;
    }
    return false;
  }

  /**
   * Log out current user
   */
  public logout(): void {
    Parse.User.logOut();
  }

  /**
   * Login a user with a username and password
   */
  public login(username: string, password: string) {

    return Parse.User.logIn(username, password).then((user: any) => {
      // Do stuff after successful login
      if (typeof document !== 'undefined') {
        console.log('Logged in user', user);
        this.router.navigate(['home-page']);
        return true;
      }

    }).catch((error: any) => {
      if (typeof document !== 'undefined') {
        console.log('Error while logging in user', error);
        alert('Invalid Login');
        return false;
      }
    });

  }

}
