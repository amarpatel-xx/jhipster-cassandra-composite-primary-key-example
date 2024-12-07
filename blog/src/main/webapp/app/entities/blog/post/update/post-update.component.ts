import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';

import { IPost } from '../post.model';
import { PostService } from '../service/post.service';
import { PostFormGroup, PostFormService } from './post-form.service';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const moment = _rollupMoment || _moment;
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { MtxDatetimepickerFilterType, MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';

@Component({
  standalone: true,
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PostUpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;
  post: IPost | null = null;

  themeColor: ThemePalette = 'primary';
  timeInputAutoFocus = true;

  type = 'moment';

  group: UntypedFormGroup;
  today: moment.Moment;
  tomorrow: moment.Moment;
  yesterday: moment.Moment;
  min: moment.Moment;
  max: moment.Moment;
  start: moment.Moment;
  filter: (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => boolean;

  protected postService = inject(PostService);
  protected postFormService = inject(PostFormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PostFormGroup = this.postFormService.createPostFormGroup();

  constructor(
    fb: UntypedFormBuilder,
    private dateAdapter: DateAdapter<any>,
  ) {
    this.today = moment.utc();
    this.tomorrow = moment.utc().date(moment.utc().date() + 1);
    this.yesterday = moment.utc().date(moment.utc().date() - 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);
    this.filter = (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => {
      if (date === null) {
        return true;
      }
      switch (type) {
        case MtxDatetimepickerFilterType.DATE:
          return date.year() % 2 === 0 && date.month() % 2 === 0 && date.date() % 2 === 0;
        case MtxDatetimepickerFilterType.HOUR:
          return date.hour() % 2 === 0;
        case MtxDatetimepickerFilterType.MINUTE:
          return date.minute() % 2 === 0;
      }
    };

    this.group = fb.group({
      dateTime: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
    });
  }

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.routeConfig?.path === 'new' ? true : false;
    this.activatedRoute.data.subscribe(({ post }) => {
      if (
        post?.compositeId !== undefined &&
        post.compositeId?.createdDate !== undefined &&
        post.compositeId?.addedDateTime !== undefined &&
        post.compositeId?.postId !== undefined
      ) {
        const today = dayjs().startOf('day');
      }
      this.post = post;
      if (post) {
        this.updateForm(post);
      }
    });
  }

  previousState(): void {
    this.router.navigate(['/blog/post']);
  }

  save(): void {
    this.isSaving = true;
    const post = this.postFormService.getPost(this.editForm);
    if (this.isNew) {
      this.subscribeToSaveResponse(this.postService.create(post));
    } else {
      this.subscribeToSaveResponse(this.postService.update(post));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(post: IPost): void {
    this.post = post;
    this.postFormService.resetForm(this.editForm, post);
  }
}
