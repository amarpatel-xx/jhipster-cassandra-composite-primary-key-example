import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DateTimeComponent } from 'app/components/date-time/date-time.component';
import { v4 as uuidv4 } from 'uuid'; // Import UUID (UUID v4)

import { IPost } from '../post.model';
import { PostService } from '../service/post.service';
import { PostFormGroup, PostFormService } from './post-form.service';
@Component({
  standalone: true,
  selector: 'jhi-post-update',
  templateUrl: './post-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MaterialModule, DateTimeComponent],
})
export class PostUpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;
  isDateTimeValid: Record<string, boolean> = {};
  // Track the dirty state for each date-time field
  isDateTimeDirty: Record<string, boolean> = {};
  post: IPost | null = null;

  protected postService = inject(PostService);
  protected postFormService = inject(PostFormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PostFormGroup = this.postFormService.createPostFormGroup();

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

  onDateTimeValid(controlName: string, isValid: boolean): void {
    this.isDateTimeValid[controlName] = isValid;
  }

  get areAllDateTimeFieldsValid(): boolean {
    const addedDateTimeControl = this.editForm.get('addedDateTime');
    const publishedDateTimeControl = this.editForm.get('publishedDateTime');

    return (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (!addedDateTimeControl?.hasError('required') || this.isDateTimeValid.addedDateTime) &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (!publishedDateTimeControl?.hasError('required') || this.isDateTimeValid.publishedDateTime)
    );
  }

  // Generate today's date and current time
  generateDateTime(field: string): void {
    const currentTimestamp = Date.now(); // Get current timestamp in milliseconds
    this.editForm.get(field)?.setValue(currentTimestamp);
    this.updateDirtyState({ field, isDirty: true }); // Mark the field as dirty
  }

  // Update dirty state when event is emitted from child
  updateDirtyState(event: { field: string; isDirty: boolean }): void {
    this.isDateTimeDirty[event.field] = event.isDirty; // Store dirty state correctly
  }

  // Reset specific field and mark it as pristine
  resetDateTime(field: string): void {
    this.updateDirtyState({ field, isDirty: false }); // Mark the field as pristine
    this.editForm.get(field)?.reset();
  }

  // Generate a new UUID and update the form
  generateUUID(field: string): void {
    const newUUID = uuidv4();
    this.editForm.get(field)?.setValue(newUUID);
  }

  // Clear the TimeUUID field
  reset(field: string): void {
    this.editForm.get(field)?.reset();
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
