import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MTX_DATETIME_FORMATS, MtxNativeDatetimeModule } from '@ng-matero/extensions/core';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxMomentDatetimeModule } from '@ng-matero/extensions-moment-adapter';
import { AlertErrorComponent } from './alert/alert-error.component';
import { AlertComponent } from './alert/alert.component';
import TranslateDirective from './language/translate.directive';
import FindLanguageFromKeyPipe from './language/find-language-from-key.pipe';

import { DayjsDateAdapter } from './date/dayjs-date-adapter';
// Adjust the path to match your project structure

import { ConvertFromDayjsToDateLongPipe } from './date/convert-from-dayjs-to-date-long.pipe';
/**
 * Application wide Module
 */
@NgModule({
  imports: [
    AlertComponent,
    AlertErrorComponent,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MtxNativeDatetimeModule,
    MtxDatetimepickerModule,
    MtxMomentDatetimeModule,
    ConvertFromDayjsToDateLongPipe,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    AlertComponent,
    AlertErrorComponent,
    TranslateModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MtxNativeDatetimeModule,
    MtxDatetimepickerModule,
    MtxMomentDatetimeModule,
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
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
          monthInput: 'MMMM',
          yearInput: 'YYYY',
          timeInput: 'HH:mm',
          datetimeInput: 'YYYY-MM-DD HH:mm',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthInput: 'MMMM',
          yearInput: 'YYYY',
          timeInput: 'HH:mm',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          monthYearLabel: 'YYYY MMMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'MMM DD, ddd',
        },
      },
    },
  ],
})
export default class SharedModule {}
