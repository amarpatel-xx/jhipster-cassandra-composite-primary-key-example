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

import { ISaathratriEntity5 } from '../saathratri-entity-5.model';
import { SaathratriEntity5Service } from '../service/saathratri-entity-5.service';
import { SaathratriEntity5FormGroup, SaathratriEntity5FormService } from './saathratri-entity-5-form.service';
@Component({
  standalone: true,
  selector: 'jhi-saathratri-entity-5-update',
  templateUrl: './saathratri-entity-5-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MaterialModule, DateTimeComponent],
})
export class SaathratriEntity5UpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;
  isDateTimeValid: Record<string, boolean> = {};
  // Track the dirty state for each date-time field
  isDateTimeDirty: Record<string, boolean> = {};
  saathratriEntity5: ISaathratriEntity5 | null = null;

  protected saathratriEntity5Service = inject(SaathratriEntity5Service);
  protected saathratriEntity5FormService = inject(SaathratriEntity5FormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SaathratriEntity5FormGroup = this.saathratriEntity5FormService.createSaathratriEntity5FormGroup();

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.routeConfig?.path === 'new' ? true : false;
    this.activatedRoute.data.subscribe(({ saathratriEntity5 }) => {
      if (
        saathratriEntity5?.compositeId !== undefined &&
        saathratriEntity5.compositeId?.organizationId !== undefined &&
        saathratriEntity5.compositeId?.entityType !== undefined &&
        saathratriEntity5.compositeId?.entityId !== undefined &&
        saathratriEntity5.compositeId?.addOnId !== undefined
      ) {
        const today = dayjs().startOf('day');
      }
      this.saathratriEntity5 = saathratriEntity5;
      if (saathratriEntity5) {
        this.updateForm(saathratriEntity5);
      }
    });
  }

  previousState(): void {
    this.router.navigate(['/blog/saathratri-entity-5']);
  }

  save(): void {
    this.isSaving = true;
    const saathratriEntity5 = this.saathratriEntity5FormService.getSaathratriEntity5(this.editForm);
    if (this.isNew) {
      this.subscribeToSaveResponse(this.saathratriEntity5Service.create(saathratriEntity5));
    } else {
      this.subscribeToSaveResponse(this.saathratriEntity5Service.update(saathratriEntity5));
    }
  }

  onDateTimeValid(controlName: string, isValid: boolean): void {
    this.isDateTimeValid[controlName] = isValid;
  }

  get areAllDateTimeFieldsValid(): boolean {
    const addOnDetailsBigIntControl = this.editForm.get('addOnDetailsBigInt');

    return (
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      !addOnDetailsBigIntControl?.hasError('required') || this.isDateTimeValid.addOnDetailsBigInt
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISaathratriEntity5>>): void {
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

  protected updateForm(saathratriEntity5: ISaathratriEntity5): void {
    this.saathratriEntity5 = saathratriEntity5;
    this.saathratriEntity5FormService.resetForm(this.editForm, saathratriEntity5);
  }
}
