import { NativeDateAdapter } from '@angular/material';

export class CustomDateAdapter extends NativeDateAdapter {
  private firstDayOfWeek = 1;
  public getFirstDayOfWeek(): number {
   return this.firstDayOfWeek;
  }

  public format(date: Date): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
  }

  public getDayOfWeekNames(): string[] {
    const SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return SHORT_NAMES;
  }
}
