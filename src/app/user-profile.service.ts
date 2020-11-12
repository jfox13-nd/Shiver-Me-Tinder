import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from 'parse';
import { Router } from '@angular/router';
import { CollapseModule } from 'angular-bootstrap-md';

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
        //console.log("ID:",result.id)
        const user = this.userSignup(username, password, newProfile, { __type: 'Pointer', className: 'profile', objectId: result.id });
        //newProfile.set('user_id', user);
        /*
        newProfile.save().then((response) => {
          // You can use the "get" method to get the value of an attribute
          // Ex: response.get("<ATTRIBUTE_NAME>")
            if (typeof document !== 'undefined')
              console.log('Updated profile', response);
          }, (error) => {
            if (typeof document !== 'undefined') 
              console.error('Error while updating profile', error);
        });
        */
      },
      (error: any) => {
        console.log('Error while creating profile: ', error);
      }
    );
  }

  private userSignup(username: string, password: string, profile, user_id): any {
    const user = new Parse.User();
    const profilePointer = new Parse.Object("<YOUR_CLASS_NAME>");
    user.set('username', username);
    user.set('password', password);
    user.set('profile_pointer', user_id);

    // tslint:disable-next-line:no-shadowed-variable
    user.signUp().then((user: any) => {
      if (typeof document !== 'undefined') { }
      console.log('User signed up', user);
      profile.set('user_id', user);
      profile.save().then((response) => {
          if (typeof document !== 'undefined')
            console.log('Updated profile', response);
        }, (error) => {
          if (typeof document !== 'undefined') 
            console.error('Error while updating profile', error);
      });
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

  public getCurrentUser() {
    return Parse.User.current();
  }

  public getUsernameFromUserId(user_id) {
    const User = new Parse.User();
    const query = new Parse.Query(User);
    return query.get(user_id);
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
