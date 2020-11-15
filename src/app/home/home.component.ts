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
    this.someid = parentThis.userProfileService.getCurrentUser().id;  // don't want to show the current users profile to themselves
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
  async load_cards(results, someid): Promise<void> {
    this.cards = [];
    let i;
    let noShowid;
    for (i = 0; i < results.length; i++) {
      this.cards.push({buttonText: 'Expand Profile', });
      this.cards[i].title = results[i].get('name');
      this.cards[i].description = results[i].get('description');
      this.cards[i].img = results[i].get('profileImage');
      this.cards[i].rank = results[i].get('rank');
      this.cards[i].username = results[i].get('username');
      this.cards[i].expand = false;
      this.cards[i].show = true;

      // noShowid will return true if there is a chatid returned indicating that the user has liked or disliked
      // the current id (results[i].user_id)
      if (typeof (results[i].get('user_id')) !== 'undefined'){
        this.cards[i].user_id = results[i].get('user_id').id;
        noShowid =  await this.chatService.getChatbyUser(results[i].get('user_id').id).then((moreresults) => {
          if (moreresults.length === 1){
            console.log(moreresults[0].id);
            return true;
          } else{
            return false;
          }
        });
        if (noShowid || results[i].get('user_id').id === someid){
          this.cards[i].show = false;
          console.log(results[i].get('user_id').id);
          console.log(noShowid);
        }

        }

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

  /**
   * Profile is liked so chat goes from wait to yes which will indicate that this profile should not be
   * shown.
   */
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
              window.location.reload();
            });
        }
      });
    });
  }

  /**
   * Profile is disliked so chat goes from wait to invalid which will indicate that this profile should not be
   * shown.
   */
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
              window.location.reload();
            });
        }
      });
    });
  }

}
