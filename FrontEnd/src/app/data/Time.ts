export class Time {
  hours: number;
  minutes: number;
  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }

  static toString(time: Time): string {
    return time.hours + ':' + time.minutes;
  }
}
