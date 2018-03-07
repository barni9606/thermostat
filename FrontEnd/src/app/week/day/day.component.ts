import {Component, Input, OnInit} from '@angular/core';
import {Day} from '../../data/Day';
import {Period} from '../../data/Period';
import {Time} from '../../data/Time';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css',  '../../styles.css']
})
export class DayComponent implements OnInit {

  @Input() dayNumber: number;
  public day: Day;

  constructor() {
    this.day = new Day();
    this.day.addPeriod(new Period(new Time(11, 0), new Time(15, 0)));
    this.day.addPeriod(new Period(new Time(10, 0), new Time(12, 0)));
    this.day.addPeriod(new Period(new Time(9, 0), new Time(13, 0)));
    this.day.addPeriod(new Period(new Time(9, 0), new Time(13, 0)));
    this.day.addPeriod(new Period(new Time(0, 0), new Time(3, 0)));
    this.day.addPeriod(new Period(new Time(16, 0), new Time(24, 0)));
    console.log(this.day);
  }

  ngOnInit() {

  }

}
