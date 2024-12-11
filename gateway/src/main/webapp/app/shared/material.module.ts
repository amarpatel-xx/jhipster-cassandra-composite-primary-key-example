import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';

import { DayjsDateAdapter } from './date/dayjs-date-adapter';
import { ConvertFromDayjsToDateLongPipe } from './date/convert-from-dayjs-to-date-long.pipe';

// Import the standalone DateTimeComponent
import { DateTimeComponent } from './date-time.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    DateTimeComponent,
    ConvertFromDayjsToDateLongPipe,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    DateTimeComponent,
    ConvertFromDayjsToDateLongPipe,
  ],
  providers: [
    { provide: DateAdapter, useClass: DayjsDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'MM/DD/YYYY' },
        display: {
          dateInput: 'MM/DD/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'MM/DD/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class MaterialModule {}
