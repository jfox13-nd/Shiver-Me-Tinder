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
  cards = [
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: ''
    },
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: ''
    },
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
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
    this.chatService.logAllChats();
    let parentThis = this;
    this.chatService.getAllChats().then(function(results) { results.forEach(element => {
      parentThis.messages.push(element.get('messages'));
    });})
    
  }

  load_cards(results): void {
    let i;
    for (i = 0; i < results.length; i++) {
      this.cards[i].title = results[i].get('name');
      this.cards[i].description = results[i].get('description');
      this.cards[i].img = results[i].get('profileImage');
    }
  }

  /**
   * Retrive user provile data from userProfileService, store in an object
   */
  load_profiles(): void {
    var parentThis = this;
    // tslint:disable-next-line:only-arrow-functions
    this.userProfileService.getAllProfiles().then(function(results) {parentThis.profileData = results});
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
    var parentThis = this;
    // tslint:disable-next-line:only-arrow-functions
    this.userProfileService.getAllProfiles().then(function(results) {
      parentThis.load_cards(results);
    });
    this.slides = this.chunk(this.cards, 3);
  }

}
