import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ConvertFromDayjsToDateLongPipe, DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ITajUser } from '../taj-user.model';

@Component({
  standalone: true,
  selector: 'jhi-taj-user-detail',
  templateUrl: './taj-user-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe, ConvertFromDayjsToDateLongPipe],
})
export class TajUserDetailComponent {
  tajUser = input<ITajUser | null>(null);

  previousState(): void {
    window.history.back();
  }
}
