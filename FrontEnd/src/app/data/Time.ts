export class Time {
  hours: number;
  minutes: number;
  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  toString(): string {
    return this.hours + ':' + this.minutes;
  }
}
