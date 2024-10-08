import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ConvertFromDayjsToDateLongPipe, DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IBlog } from '../blog.model';

@Component({
  standalone: true,
  selector: 'jhi-blog-detail',
  templateUrl: './blog-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe, ConvertFromDayjsToDateLongPipe],
})
export class BlogDetailComponent {
  blog = input<IBlog | null>(null);

  previousState(): void {
    window.history.back();
  }
}
