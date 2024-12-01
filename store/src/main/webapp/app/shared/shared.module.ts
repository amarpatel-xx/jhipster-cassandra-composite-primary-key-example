import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import FindLanguageFromKeyPipe from './language/find-language-from-key.pipe';
import TranslateDirective from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';

import { DayjsDateAdapter } from './date/dayjs-date-adapter';
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
export default class SharedModule {}
