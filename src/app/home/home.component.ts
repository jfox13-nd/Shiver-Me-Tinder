import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { ChatService } from '../chat.service';

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
    this.userProfileService.getAllProfiles().then((results) => {
      parentThis.load_cards(results);
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
  load_cards(results): void {
    this.cards = [];
    let i;
    for (i = 0; i < results.length; i++) {
      this.cards.push({buttonText: 'Yarrr!', });
      this.cards[i].title = results[i].get('name');
      this.cards[i].description = results[i].get('description');
      this.cards[i].img = results[i].get('profileImage');
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
  log_data(): void {
    const parentThis = this;
    this.userProfileService.getAllProfiles().then((results) => {
      parentThis.load_cards(results);
    });
    this.slides = this.chunk(this.cards, 3);
  }

}
