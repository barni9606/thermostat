import { Component } from '@angular/core';
import {WeekService} from './week-service/week.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public day_names = [
    { 'long': 'Hétfő',     'short': 'H',   'number': 0, 'checked': false },
    { 'long': 'Kedd',      'short': 'K',   'number': 1, 'checked': false },
    { 'long': 'Szerda',    'short': 'Sze', 'number': 2, 'checked': false },
    { 'long': 'Csütörtök', 'short': 'Cs',  'number': 3, 'checked': false },
    { 'long': 'Péntek',    'short': 'P',   'number': 4, 'checked': false },
    { 'long': 'Szombat',   'short': 'Szo', 'number': 5, 'checked': false },
    { 'long': 'Vasárnap',  'short': 'V',   'number': 6, 'checked': false }
  ];
  public fromDay: number;

  constructor(private weekService: WeekService) {

  }

  copy() {
    this.weekService.setDays(this.selectedDays, this.fromDay);
  }

  get selectedDays(): number[] {
    const selectedDays: number[] = [];
    this.day_names
      .filter(day => day.checked)
      .map(day => {
        selectedDays.splice(selectedDays.length - 1, 0, day.number);
      });
    this.day_names.map(day => day.checked = false);
    return selectedDays;
  }
}
