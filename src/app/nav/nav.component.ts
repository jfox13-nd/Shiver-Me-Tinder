import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userProfileService: UserProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Log out user and route to login page
   */
  public logOutUser(): void {
    this.userProfileService.logout();
    this.router.navigate(['']);
  }

}
