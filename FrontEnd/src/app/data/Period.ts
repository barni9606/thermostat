import {Time} from './Time';


export class Period {
  public start: Time;
  public finish: Time;
  public temperature: number;

  constructor(start: Time, finish: Time, temperature: number) {
    this.start = start;
    this.finish = finish;
    this.temperature = temperature;
  }

  static startsAfterStarts(first: Period, second: Period): boolean {
    return first.start.hours * 60 + first.start.minutes > second.start.hours * 60 + second.start.minutes;
  }

  static startsBeforeFinishes(first: Period, second: Period): boolean {
    return first.start.hours * 60 + first.start.minutes < second.finish.hours * 60 + second.finish.minutes;
  }

  static finishesAfterStarts(first: Period, second: Period): boolean {
    return first.finish.hours * 60 + first.finish.minutes > second.start.hours * 60 + second.start.minutes;
  }

  static finishesAfterFinishes(first: Period, second: Period): boolean {
    return first.finish.hours * 60 + first.finish.minutes > second.finish.hours * 60 + second.finish.minutes;
  }

  static getHeight(p: Period): string {
    return (p.finish.hours * 60 + p.finish.minutes - (p.start.hours * 60 + p.start.minutes)) / 60 * 40 + 'px';
  }

  static toString(p: Period): string {
    return p.start.toString() + '-' + p.finish.toString();
  }
}
