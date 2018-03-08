import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-period',
  templateUrl: './new-period.component.html',
  styleUrls: ['./new-period.component.css']
})
export class NewPeriodComponent implements OnInit {
  @Input() pos = {'top': 0, 'height': 50};

  constructor() { }

  ngOnInit() {
  }

}
