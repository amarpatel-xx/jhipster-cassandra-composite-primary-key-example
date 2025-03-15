import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { v1 as uuidv1 } from 'uuid'; // Import TimeUUID (UUID v1)
import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';
import { BlogFormGroup, BlogFormService } from './blog-form.service';

@Component({
  standalone: true,
  selector: 'jhi-blog-update',
  templateUrl: './blog-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class BlogUpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;
  blog: IBlog | null = null;

  protected blogService = inject(BlogService);
  protected blogFormService = inject(BlogFormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected isResetDisabled: Record<string, boolean> = {}; // Track reset button states
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private lastSavedValues: Record<string, any> = {}; // Store last valid values

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BlogFormGroup = this.blogFormService.createBlogFormGroup();

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.routeConfig?.path === 'new' ? true : false;
    this.activatedRoute.data.subscribe(({ blog }) => {
      this.blog = blog;
      if (blog) {
        this.updateForm(blog);
      }
    });

    // Listen for changes to enable/disable reset button
    Object.keys(this.editForm.controls).forEach(field => {
      this.editForm.get(field)?.valueChanges.subscribe(() => {
        this.updateResetButtonState(field);
      });
    });
  }

  previousState(): void {
    this.router.navigate(['/blog/blog']);
  }

  save(): void {
    this.isSaving = true;
    const blog = this.blogFormService.getBlog(this.editForm);
    if (this.isNew) {
      this.subscribeToSaveResponse(this.blogService.create(blog));
    } else {
      this.subscribeToSaveResponse(this.blogService.update(blog));
    }
  }

  // Generate a new TimeUUID and update the form
  generateTimeUUID(field: string): void {
    const newTimeUUID = uuidv1();
    this.editForm.get(field)?.setValue(newTimeUUID);
  }

  // Clear the TimeUUID field
  reset(field: string): void {
    const lastValue = this.lastSavedValues[field];
    const currentValue = this.editForm.get(field)?.value;

    // Only reset if the value has changed
    if (currentValue !== lastValue) {
      this.editForm.get(field)?.setValue(lastValue, { emitEvent: false });
    }

    // Ensure reset button gets disabled after restoring the previous value
    this.updateResetButtonState(field);
  }

  updateResetButtonState(field: string): void {
    const lastValue = this.lastSavedValues[field];
    const currentValue = this.editForm.get(field)?.value;
    this.isResetDisabled[field] = currentValue === lastValue; // Disable if unchanged
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBlog>>): void {
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

  protected updateForm(blog: IBlog): void {
    this.blog = blog;
    this.blogFormService.resetForm(this.editForm, blog);

    // Store the last saved values from the response
    Object.keys(this.editForm.controls).forEach(field => {
      this.lastSavedValues[field] = this.editForm.get(field)?.value;
      this.isResetDisabled[field] = true; // Disable reset button on load
    });
  }
}
