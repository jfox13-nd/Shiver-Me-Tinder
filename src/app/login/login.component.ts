import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  gradientForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.gradientForm = fb.group({
      gradientFormUsernameEx: ['', [Validators.required]],
      gradientFormPasswordEx: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
