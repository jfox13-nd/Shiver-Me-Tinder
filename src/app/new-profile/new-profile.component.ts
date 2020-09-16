import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {

  // A form group and subsequent form controls
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  /*
  * Handles basic form submission 
  */
  onSubmit(): void {
    alert('This form is not yet connected to a database');
  }

}
