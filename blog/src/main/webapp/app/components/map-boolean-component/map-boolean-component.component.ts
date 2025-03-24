import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditBooleanDialogComponent } from '../edit-boolean-dialog-component/edit-boolean-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-boolean-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditBooleanDialogComponent],
  templateUrl: './map-boolean-component.component.html',
  styleUrls: ['./map-boolean-component.component.css'],
})
export class MapBooleanComponent {
  @Input() inputFields: Map<string, boolean> = new Map<string, boolean>();
  @Output() dataChange = new EventEmitter<Map<string, boolean>>();

  mapDetails: Map<string, boolean> = new Map<string, boolean>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required], // ✅ Key is required
      newValue: [null, Validators.required], // ✅ Required selection (True/False)
    });
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  openEditBooleanDialog(key: string, value: boolean): void {
    const dialogRef = this.dialog.open(EditBooleanDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && typeof result === 'boolean') {
        this.mapDetails.set(key, result);
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails.set(newKey.trim(), newValue);
      this.form.reset({ newKey: '', newValue: null }); // ✅ Reset form after adding
      this.emitData();
    }
  }

  deleteRow(key: string): void {
    this.mapDetails.delete(key);
    this.emitData();
  }

  resetSelection(): void {
    this.form.get('newValue')?.setValue(null);
  }

  private emitData(): void {
    this.dataChange.emit(new Map(this.mapDetails));
  }
}
