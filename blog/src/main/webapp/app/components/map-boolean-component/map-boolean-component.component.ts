import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      fields: this.fb.array([]), // ✅ FormArray to manage dynamic boolean fields
      newKey: ['', Validators.required], // ✅ Key is required
      newValue: [null, Validators.required], // ✅ Required selection (True/False)
    });

    this.populateFormArray();
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  ngOnChanges(): void {
    this.populateFormArray();
  }

  populateFormArray(): void {
    this.fields.clear();
    Array.from(this.mapDetails.entries()).forEach(([key, value]) => {
      this.fields.push(this.fb.group({ key: [key], value: [value, Validators.required] }));
    });
  }

  getFormControl(index: number, controlName: string): FormControl {
    return this.fields.at(index).get(controlName) as FormControl;
  }

  openEditBooleanDialog(index: number): void {
    const field = this.fields.at(index).value;
    const dialogRef = this.dialog.open(EditBooleanDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key: field.key, value: field.value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && typeof result === 'boolean') {
        this.getFormControl(index, 'value').setValue(result);
        this.mapDetails.set(field.key, result);
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails.set(newKey.trim(), newValue);
      this.fields.push(this.fb.group({ key: [newKey.trim()], value: [newValue, Validators.required] }));
      this.form.reset({ newKey: '', newValue: null }); // ✅ Reset form after adding
      this.emitData();
    }
  }

  deleteRow(index: number): void {
    const field = this.fields.at(index).value;
    this.mapDetails.delete(field.key);
    this.fields.removeAt(index);
    this.emitData();
  }

  resetSelection(): void {
    this.form.get('newValue')?.setValue(null);
  }

  private emitData(): void {
    this.dataChange.emit(new Map(this.mapDetails));
  }
}
