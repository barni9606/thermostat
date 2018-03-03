import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css',  '../../styles.css']
})
export class DayComponent implements OnInit {

  @Input() day: number;

  constructor() { }

  ngOnInit() {
  }

}
