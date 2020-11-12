import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { ChatService } from '../chat.service';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userProfileService: UserProfileService, private chatService: ChatService) { }

  private messages = [];
  private profileData;
  cards = [];
  slides: any = [[]];
  private someid = [];
  thisshow = true;

  /**
   * format data to populate cards
   */
  chunk(arr, chunkSize) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.load_profiles();
    const parentThis = this;
    this.someid = parentThis.userProfileService.getCurrentUser().id;
    this.userProfileService.getAllProfiles().then((results) => {
      parentThis.load_cards(results, this.someid);
    });
    this.chatService.getAllChats().then((results) => {
      results.forEach(element => {
        parentThis.messages.push(element.get('messages'));
      });
    });
  }

  /**
   * Push data into the carosel cards
   */
  load_cards(results, someid): void {
    this.cards = [];
    let i;
    for (i = 0; i < results.length; i++) {
      this.cards.push({buttonText: 'Expand Profile', });
      this.cards[i].title = results[i].get('name');
      this.cards[i].description = results[i].get('description');
      this.cards[i].img = results[i].get('profileImage');
      this.cards[i].rank = results[i].get('rank');
      this.cards[i].username = results[i].get('username');
      this.cards[i].expand = false;
      
      if (typeof (results[i].get('user_id')) !== 'undefined' && this.liked2(results[i].get('user_id').id)){
        console.log('here');
        this.cards[i].show = false;
      } else {
        this.cards[i].show = true;
      }
      if (typeof (results[i].get('user_id')) !== 'undefined' && results[i].get('user_id').id === someid){
        this.cards[i].show = false;
      }
      if(typeof (results[i].get('user_id')) !== 'undefined'){
        console.log(this.liked2(results[i].get('user_id').id));
        this.cards[i].user_id = results[i].get('user_id').id;
      }

      // if (typeof (results[i].get('user_id')) !== 'undefined'){
      //   const parentThis = this;
      //   const current_user_id = parentThis.userProfileService.getCurrentUser().id;
      //   const thisid = results[i].get('user_id').id;
      //   this.chatService.getAllChats().then((somes) => {
      //     somes.forEach(element => {
      //       let userA = element.get('userA');
      //       let userB = element.get('userB');
      //       let chatActivity = element.get('activeChat');
      //       if (userA.id === thisid && userB.id === current_user_id && chatActivity === 'yes'){
      //         this.thisshow = false;
      //         console.log(thisid, this.thisshow);
      //       } else if (userA.id === thisid && userB.id === current_user_id && chatActivity === 'invalid'){
      //         this.thisshow = false;
      //       } else {
      //         console.log(thisid, this.thisshow);
      //       }
      //     });
      //   });
      //   this.cards[i].user_id = results[i].get('user_id').id;
      // }

    }
  }

  /**
   * Retrive user provile data from userProfileService, store in an object
   */
  load_profiles(): void {
    const parentThis = this;
    this.userProfileService.getAllProfiles().then((results) => {
      parentThis.profileData = results;
    });
  }

  /**
   * Return user profile information after a load
   */
  get_profiles(): void {
    this.load_profiles();
    return this.profileData;
  }

  /**
   * Populate cards with user data
   */
  log_data(someid): void {
    const parentThis = this;
    this.userProfileService.getAllProfiles().then((results) => {
      parentThis.load_cards(results, someid);
    });
    this.slides = this.chunk(this.cards, 3);
  }

    liked(likedid){
    const parentThis = this;
    const current_user_id = parentThis.userProfileService.getCurrentUser().id;
    this.chatService.getAllChats().then((results) => {
      results.forEach(element => {
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');
        if (userA.id === likedid && userB.id === current_user_id && chatActivity === 'wait'){
            element.set('activeChat', 'yes');
            element.save().then((element) => {
              console.log('chat saved');
              parentThis.log_data(current_user_id);
            });
        } else if (userA.id === likedid && userB.id === current_user_id && chatActivity === 'yes'){
              this.thisshow = false;
        } else {
              this.thisshow = true;
        }
      });
    });
  }

  liked2(likedid){
    const parentThis = this;
    const current_user_id = parentThis.userProfileService.getCurrentUser().id;
    this.chatService.getAllChats().then((results) => {
      results.forEach(element => {
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');
        if (userA.id === likedid && userB.id === current_user_id && chatActivity === 'wait'){
            
        } else if (userA.id === likedid && userB.id === current_user_id && chatActivity === 'yes'){
            console.log('should return true', likedid);
            return true;
        } else {
        }
      });
    });
    return false;
  }

    disliked(dislikedid){
    const parentThis = this;
    const current_user_id = parentThis.userProfileService.getCurrentUser().id;
    this.chatService.getAllChats().then((results) => {
      results.forEach(element => {
        let userA = element.get('userA');
        let userB = element.get('userB');
        let chatActivity = element.get('activeChat');
        if (userA.id === dislikedid && userB.id === current_user_id && chatActivity === 'wait'){
            element.set('activeChat', 'invalid');
            element.save().then((element) => {
              console.log('chat saved');
              parentThis.log_data(current_user_id);
            });
        } else if (userA.id === dislikedid && userB.id === current_user_id && chatActivity === 'invalid'){
            return true;
        }
      });
    });
  }

}
