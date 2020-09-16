import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile_data;
  constructor(private userProfileService: UserProfileService,) { }

  ngOnInit(): void {
    this.load_profiles()
  }

  load_profiles(): void {
    this.userProfileService.getUsers().subscribe( data => {this.profile_data = data})
  }

  get_profiles(): void {
    return this.profile_data;
  }

  log_data(): void {
    console.log(this.profile_data);
  }

  add_profile(name: string, description: string): void {
    this.profile_data["users"].push(
      {
        "name": name,
        "descriptipn": description
      }
    )
  }

}
