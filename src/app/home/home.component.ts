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
      img: 'https://i2-prod.bristolpost.co.uk/news/bristol-news/article271300.ece/ALTERNATES/s615/Blackbeard.jpg'
    },
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: 'https://ca-times.brightspotcdn.com/dims4/default/c89cad7/2147483647/strip/true/crop/600x400+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5f%2Fe9%2F4d182b154e52843afa07425e55d7%2Fla-xpm-photo-2013-nov-08-la-sh-johnny-depp-jack-sparrow-cake-20131108'
    },
    {
      title: '',
      description: '',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
  slides: any = [[]];
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

  load_profiles(): void {
    this.userProfileService.getUsers().subscribe( data => {this.profileData = data; });
  }

  get_profiles(): void {
    this.load_profiles();
    return this.profileData;
  }

  log_data(): void {
    this.load_profiles();
    this.cards[0].title = this.profileData.users[0].name;
    this.cards[0].description = this.profileData.users[0].description;
    this.cards[1].title = this.profileData.users[1].name;
    this.cards[1].description = this.profileData.users[1].description;
    this.slides = this.chunk(this.cards, 3);
  }

}
