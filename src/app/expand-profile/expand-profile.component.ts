import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expand-profile',
  templateUrl: './expand-profile.component.html',
  styleUrls: ['./expand-profile.component.scss']
})
export class ExpandProfileComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() image: string;
  @Input() rank: string;
  @Input() username: string;

  constructor() { }

  ngOnInit() {
  }

}
