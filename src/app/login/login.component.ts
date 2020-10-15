import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  gradientForm: FormGroup;

  constructor(public fb: FormBuilder, private userProfileService: UserProfileService, private router: Router) {
    this.gradientForm = fb.group({
      gradientFormUsernameEx: ['', [Validators.required]],
      gradientFormPasswordEx: ['', Validators.required],
    });
  }

  login() {
    this.userProfileService.login(this.gradientForm.value.gradientFormUsernameEx, this.gradientForm.value.gradientFormPasswordEx);
    //this.gradientForm.value.gradientFormUsernameEx
  }

  ngOnInit() {
  }

}
