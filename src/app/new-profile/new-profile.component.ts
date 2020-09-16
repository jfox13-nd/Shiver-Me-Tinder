import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    description: new FormControl(''),
  });

  private output_string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    alert("This form is not yet connected to a database")
  }

}
