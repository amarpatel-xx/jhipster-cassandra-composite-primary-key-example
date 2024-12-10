import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatetimeAdapter } from '@ng-matero/extensions/core';
import dayjs, { Dayjs } from 'dayjs';

@Injectable()
export class DayjsDatetimeAdapter extends DatetimeAdapter<Dayjs> {
  constructor(@Optional() @Inject(DateAdapter) delegate: DateAdapter<Dayjs>, @Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: string) {
    super(delegate); // Pass the delegate to the parent class
    this.setLocale(matDateLocale || 'en'); // Default locale to 'en'
  }

  override getHour(date: dayjs.Dayjs): number {
    return date.hour();
  }

  override getMinute(date: dayjs.Dayjs): number {
    return date.minute();
  }

  override getFirstDateOfMonth(date: dayjs.Dayjs): dayjs.Dayjs {
    return date.startOf('month');
  }

  override isInNextMonth(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs): boolean {
    return startDate.add(1, 'month').isSame(endDate, 'month');
  }

  override getHourNames(): string[] {
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  }

  override getMinuteNames(): string[] {
    return Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  }

  override addCalendarHours(date: dayjs.Dayjs, hours: number): dayjs.Dayjs {
    return date.add(hours, 'hour');
  }

  override addCalendarMinutes(date: dayjs.Dayjs, minutes: number): dayjs.Dayjs {
    return date.add(minutes, 'minute');
  }

  override createDatetime(year: number, month: number, date: number, hour: number, minute: number): dayjs.Dayjs {
    return dayjs().set('year', year).set('month', month).set('date', date).set('hour', hour).set('minute', minute);
  }

  override parse(value: any, parseFormat: any): Dayjs | null {
    if (typeof value === 'string' || value instanceof Date) {
      return dayjs(value, parseFormat, true);
    }
    console.error('Invalid value passed to parse:', value);
    return null; // Return null for invalid input
  }

  override format(date: Dayjs, displayFormat: any): string {
    if (!dayjs.isDayjs(date)) {
      console.error('Invalid date passed to format:', date);
      return ''; // Return an empty string for invalid input
    }
    return date.format('YYYY-MM-DD HH:mm'); // Hardcoded format
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
    if (value instanceof Date || typeof value === 'string') {
      return dayjs(value);
    }
    return null;
  }
}
