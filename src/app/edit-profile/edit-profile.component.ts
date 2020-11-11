import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private userProfileService: UserProfileService){}

  model: any = {};
  ngOnInit() {
  }

  onSubmit(): void {
    this.userProfileService.updateProfile(this.model.description, this.model.Name, 'https://blog.yellowoctopus.com.au/wp-content/uploads/2019/06/yellow-octopus-pirate-jokes.jpg', this.model.title );
  }

}
