import { Time } from './Time';
import { Period } from './Period';

export class Day {
  public periods: Period[];

  constructor() {
  }

  static addPeriod(day: Day, newP: Period): void {
    const periodss = day.periods;
    let index: number;
    let indexAfter: number;
    for (index = 0; index < day.periods.length; index++) {
      if (!Period.startsAfterStarts(newP, day.periods[index])) {
        break;
      }
    }

    for (indexAfter = index; indexAfter < day.periods.length; indexAfter++) {
      if (!Period.finishesAfterStarts(newP, day.periods[indexAfter])) {
        break;
      }
    }

    if (index > 0 && Period.finishesAfterFinishes(day.periods[index - 1], newP)) {
      day.periods.splice(index, 0, new Period(newP.finish, day.periods[index - 1].finish, day.periods[index - 1].temperature));
    }
    if (index > 0) {
      day.periods[index - 1].finish = newP.start;
    }

    if (indexAfter > 0 && indexAfter > index) {
      day.periods[indexAfter - 1].start = newP.finish;
    }

    day.periods.splice(index, indexAfter - index - 1, newP);

    const periodsToDelete: Period[] = [];
    for (const period of day.periods) {
      if (period.start.hours === period.finish.hours && period.start.minutes === period.finish.minutes) {
        periodsToDelete.splice(0, 0, period);
      }
    }
    for (const period of periodsToDelete) {
      day.periods.splice(day.periods.indexOf(period), 1);
    }
  }
}
