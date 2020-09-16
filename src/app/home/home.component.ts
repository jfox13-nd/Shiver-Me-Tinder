import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private profileData;
  constructor(private userProfileService: UserProfileService, ) { }

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
    console.log(this.profileData);
  }

}
