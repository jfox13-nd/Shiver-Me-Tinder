import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userProfileService: UserProfileService, ) { }

  private profileData;
  cards = [
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: ''//'https://i2-prod.bristolpost.co.uk/news/bristol-news/article271300.ece/ALTERNATES/s615/Blackbeard.jpg'
    },
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: ''//'https://ca-times.brightspotcdn.com/dims4/default/c89cad7/2147483647/strip/true/crop/600x400+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5f%2Fe9%2F4d182b154e52843afa07425e55d7%2Fla-xpm-photo-2013-nov-08-la-sh-johnny-depp-jack-sparrow-cake-20131108'
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
  }

  load_cards(results): void {
    var i;
    for (i=0; i < results.length; i++) {
      this.cards[i].title = results[i].get('name')
      this.cards[i].description = results[i].get('description');
      this.cards[i].img = results[i].get('profileImage');
    }
  }

  /**
   * Retrive user provile data from userProfileService, store in an object
   */
  load_profiles(): void {
    var parentThis = this;
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
    this.userProfileService.getAllProfiles().then(function(results) {
      parentThis.load_cards(results);
    });
    this.slides = this.chunk(this.cards, 3);
  }

}
