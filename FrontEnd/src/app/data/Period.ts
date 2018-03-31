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

  startsAfterStarts(other: Period): boolean {
    return this.start.hours * 60 + this.start.minutes > other.start.hours * 60 + other.start.minutes;
  }

  startsBeforeFinishes(other: Period): boolean {
    return this.start.hours * 60 + this.start.minutes < other.finish.hours * 60 + other.finish.minutes;
  }

  finishesAfterStarts(other: Period): boolean {
    return this.finish.hours * 60 + this.finish.minutes > other.start.hours * 60 + other.start.minutes;
  }

  finishesAfterFinishes(other: Period): boolean {
    return this.finish.hours * 60 + this.finish.minutes > other.finish.hours * 60 + other.finish.minutes;
  }

  getHeight(): string {
    return (this.finish.hours * 60 + this.finish.minutes - (this.start.hours * 60 + this.start.minutes)) / 60 * 40 + 'px';
  }

  toString(): string {
    return this.start.toString() + '-' + this.finish.toString();
  }
}
