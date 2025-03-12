import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { v4 as uuidv4 } from 'uuid'; // Import UUID (UUID v4)
import { v1 as uuidv1 } from 'uuid'; // Import TimeUUID (UUID v1)
import { ISaathratriEntity } from '../saathratri-entity.model';
import { SaathratriEntityService } from '../service/saathratri-entity.service';
import { SaathratriEntityFormGroup, SaathratriEntityFormService } from './saathratri-entity-form.service';
@Component({
  standalone: true,
  selector: 'jhi-saathratri-entity-update',
  templateUrl: './saathratri-entity-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class SaathratriEntityUpdateComponent implements OnInit {
  isSaving = false;
  // Saathratri:
  isNew = false;
  saathratriEntity: ISaathratriEntity | null = null;

  protected saathratriEntityService = inject(SaathratriEntityService);
  protected saathratriEntityFormService = inject(SaathratriEntityFormService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SaathratriEntityFormGroup = this.saathratriEntityFormService.createSaathratriEntityFormGroup();

  ngOnInit(): void {
    this.isNew = this.activatedRoute.snapshot.routeConfig?.path === 'new' ? true : false;
    this.activatedRoute.data.subscribe(({ saathratriEntity }) => {
      this.saathratriEntity = saathratriEntity;
      if (saathratriEntity) {
        this.updateForm(saathratriEntity);
      }
    });
  }

  previousState(): void {
    this.router.navigate(['/blog/saathratri-entity']);
  }

  save(): void {
    this.isSaving = true;
    const saathratriEntity = this.saathratriEntityFormService.getSaathratriEntity(this.editForm);
    // Single-value Primary Key
    if (this.isNew) {
      this.subscribeToSaveResponse(this.saathratriEntityService.create(saathratriEntity));
    } else {
      this.subscribeToSaveResponse(this.saathratriEntityService.update(saathratriEntity));
    }
  }

  // Generate a new UUID and update the form
  generateUUID(field: string): void {
    const newUUID = uuidv4();
    this.editForm.get(field)?.setValue(newUUID);
  }

  // Clear the UUID field
  clearUUID(field: string): void {
    this.editForm.get(field)?.setValue('');
  }

  // Generate a new TimeUUID and update the form
  generateTimeUUID(field: string): void {
    const newTimeUUID = uuidv1();
    this.editForm.get(field)?.setValue(newTimeUUID);
  }

  // Clear the TimeUUID field
  clearTimeUUID(field: string): void {
    this.editForm.get(field)?.setValue('');
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISaathratriEntity>>): void {
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

  protected updateForm(saathratriEntity: ISaathratriEntity): void {
    this.saathratriEntity = saathratriEntity;
    this.saathratriEntityFormService.resetForm(this.editForm, saathratriEntity);
  }
}
