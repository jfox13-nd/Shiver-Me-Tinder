import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit{

  constructor(private userProfileService: UserProfileService){}

  model: any = {};
  ngOnInit(): void {
  }
  /*
  * Handles basic form submission
  */
  onSubmit(): void {
    this.userProfileService.createProfile(this.model.title, this.model.username, this.model.password, this.model.Name, '' );
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
  }

}
