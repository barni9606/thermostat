import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Day } from '../data/Day';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class WeekService {

  private setDaySubject = new BehaviorSubject<object>(null);
  setDayObservable = this.setDaySubject.asObservable();
  backend = window.location.protocol + '//' + window.location.hostname + ':5000';
  days: Day[];
  private syncDelay = false;

  constructor(private http: HttpClient) { }

  getWeek(): Observable<Day[]> {
    const resp = this.http.get<Day[]>(this.backend + '/week');
    resp.subscribe(data => this.days = data);
    return resp;
  }

  synchronize(dayNumber: number, day: Day) {
    if (this.days) {
      this.days.splice(dayNumber, 1, day);
      if (this.syncDelay) {
        return;
      }
      this.syncDelay = true;
      setTimeout(() => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.put(this.backend + '/week', this.days, {headers: headers}).subscribe();
        this.syncDelay = false;
      }, 1000);
    } else {
      throw new Error();
    }
  }

  setDays(dayNumbers: number[], from: number): void {
    this.setDaySubject.next({'dayNumbers': dayNumbers, 'from': this.days[from]});
  }

  public getLocalTimeAndTemp(): Observable<object> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/html');
    return this.http.get<object>(this.backend + '/local-time-and-temp', {headers: headers});
  }

}
