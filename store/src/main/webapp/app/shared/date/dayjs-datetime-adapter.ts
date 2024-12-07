import { Injectable } from '@angular/core';
import { DatetimeAdapter } from '@ng-matero/extensions';
import dayjs, { Dayjs } from 'dayjs';

@Injectable()
export class DayjsDatetimeAdapter extends DatetimeAdapter<Dayjs> {
  override parse(value: any, parseFormat: any): Dayjs | null {
    if (value && typeof value === 'string') {
      return dayjs(value, parseFormat, true);
    }
    return dayjs(value);
  }

  override format(date: Dayjs, displayFormat: any): string {
    return date ? date.format(displayFormat) : '';
  }

  override addCalendarYears(date: Dayjs, years: number): Dayjs {
    return date.add(years, 'year');
  }

  override addCalendarMonths(date: Dayjs, months: number): Dayjs {
    return date.add(months, 'month');
  }

  override addCalendarDays(date: Dayjs, days: number): Dayjs {
    return date.add(days, 'day');
  }

  override toIso8601(date: Dayjs): string {
    return date.toISOString();
  }

  override isValid(date: Dayjs): boolean {
    return date.isValid();
  }

  override isSameDay(date1: Dayjs, date2: Dayjs): boolean {
    return date1.isSame(date2, 'day');
  }

  override isSameMonth(date1: Dayjs, date2: Dayjs): boolean {
    return date1.isSame(date2, 'month');
  }

  override isSameYear(date1: Dayjs, date2: Dayjs): boolean {
    return date1.isSame(date2, 'year');
  }

  override invalid(): Dayjs {
    return dayjs.invalid();
  }

  override getYear(date: Dayjs): number {
    return date.year();
  }

  override getMonth(date: Dayjs): number {
    return date.month();
  }

  override getDate(date: Dayjs): number {
    return date.date();
  }

  override createDate(year: number, month: number, date: number): Dayjs {
    return dayjs().set('year', year).set('month', month).set('date', date);
  }

  override today(): Dayjs {
    return dayjs();
  }

  override clone(date: Dayjs): Dayjs {
    return date.clone();
  }

  override isDateInstance(obj: any): boolean {
    return dayjs.isDayjs(obj);
  }

  override deserialize(value: any): Dayjs | null {
    if (value instanceof Date) {
      return dayjs(value);
    }
    if (typeof value === 'string') {
      return dayjs(value);
    }
    return null;
  }
}
