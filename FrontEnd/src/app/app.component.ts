import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public day_names = [
    { 'long': 'Hétfő',     'short': 'H',   'number': 0 },
    { 'long': 'Kedd',      'short': 'K',   'number': 1 },
    { 'long': 'Szerda',    'short': 'Sze', 'number': 2 },
    { 'long': 'Csütörtök', 'short': 'Cs',  'number': 3 },
    { 'long': 'Péntek',    'short': 'P',   'number': 4 },
    { 'long': 'Szombat',   'short': 'Szo', 'number': 5 },
    { 'long': 'Vasárnap',  'short': 'V',   'number': 6 }
  ];
}
