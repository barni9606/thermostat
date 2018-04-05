import { Component, OnInit } from '@angular/core';
import {Day} from '../data/Day';
import {WeekService} from '../week-service/week.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css', '../styles.css']
})
export class WeekComponent implements OnInit {

  public days: Day[];
  public hours: string[];
  public day_names: object[];

  constructor(private weekService: WeekService) {
    this.weekService.getWeek().subscribe(data => {
      this.days = data;
    });
    this.hours = [
      '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
      '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ];
    this.day_names = [
      { 'long': 'Hétfő',     'short': 'H',   'number': 0 },
      { 'long': 'Kedd',      'short': 'K',   'number': 1 },
      { 'long': 'Szerda',    'short': 'Sze', 'number': 2 },
      { 'long': 'Csütörtök', 'short': 'Cs',  'number': 3 },
      { 'long': 'Péntek',    'short': 'P',   'number': 4 },
      { 'long': 'Szombat',   'short': 'Szo', 'number': 5 },
      { 'long': 'Vasárnap',  'short': 'V',   'number': 6 }
    ];
  }

  ngOnInit() {
  }

}
