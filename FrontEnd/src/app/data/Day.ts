import { Time } from './Time';
import { Period } from './Period';

export class Day {
  public periods: Period[];

  constructor() {
    this.periods = [
      new Period(new Time(0, 0), new Time(24, 0), 20)
    ];
  }

  addPeriod(newP: Period): void {
    const periodss = this.periods;
    let index: number;
    let indexAfter: number;
    for (index = 0; index < this.periods.length; index++) {
      if (!newP.startsAfterStarts(this.periods[index])) {
        break;
      }
    }

    for (indexAfter = index; indexAfter < this.periods.length; indexAfter++) {
      if (!newP.finishesAfterStarts(this.periods[indexAfter])) {
        break;
      }
    }

    if (index > 0 && this.periods[index - 1].finishesAfterFinishes(newP)) {
      this.periods.splice(index, 0, new Period(newP.finish, this.periods[index - 1].finish, this.periods[index - 1].temperature));
    }
    if (index > 0) {
      this.periods[index - 1].finish = newP.start;
    }

    if (indexAfter > 0 && indexAfter > index) {
      this.periods[indexAfter - 1].start = newP.finish;
    }

    this.periods.splice(index, indexAfter - index - 1, newP);

    const periodsToDelete: Period[] = [];
    for (const period of this.periods) {
      if (period.start.hours === period.finish.hours && period.start.minutes === period.finish.minutes) {
        periodsToDelete.splice(0, 0, period);
      }
    }
    for (const period of periodsToDelete) {
      this.periods.splice(this.periods.indexOf(period), 1);
    }
  }
}
