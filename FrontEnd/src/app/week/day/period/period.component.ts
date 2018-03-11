import {Component, Input, OnInit} from '@angular/core';
import {Period} from '../../../data/Period';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css', '../../../styles.css']
})
export class PeriodComponent implements OnInit {
  public color: string;
  colors = [
    'AntiqueWhite', 'Azure', 'DarkGray'
  ];
  @Input() period: Period;

  constructor() {
  }

  ngOnInit() {
    const a = Math.floor(Math.random() * Math.floor(this.colors.length));
    this.color = this.colors[a];
  }

}
