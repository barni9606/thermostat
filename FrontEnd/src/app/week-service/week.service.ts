import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Day } from '../data/Day';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeekService {

  backend = 'http://localhost:5000';
  days: Day[];

  constructor(private http: HttpClient) { }

  getWeek(): Observable<Day[]> {
    const resp = this.http.get<Day[]>(this.backend + '/week');
    resp.subscribe(data => this.days = data);
    return resp;
  }

  synchronize(dayNumber: number, day: Day) {
    if (this.days) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.days.splice(dayNumber, 1, day);
      return this.http.put(this.backend + '/week', this.days, {headers: headers});
    } else {
      throw new Error();
    }
  }

}
