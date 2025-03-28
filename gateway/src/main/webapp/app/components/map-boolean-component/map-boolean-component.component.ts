import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class MapBooleanComponent implements OnChanges {
  @Input() inputFields: Record<string, boolean> = {};
  @Output() dataChange = new EventEmitter<Record<string, boolean>>();

  mapDetails: Record<string, boolean> = {};
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      fields: this.fb.array([]),
      newKey: ['', Validators.required],
      newValue: [null, Validators.required],
    });
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes.inputFields && this.inputFields) {
      this.mapDetails = { ...this.inputFields };
      this.populateFormArray();
    }
  }

  populateFormArray(): void {
    this.fields.clear();
    Object.entries(this.mapDetails).forEach(([key, value]) => {
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
      if (typeof result === 'boolean') {
        this.getFormControl(index, 'value').setValue(result);
        this.mapDetails[field.key] = result;
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      const trimmedKey = newKey.trim();
      this.mapDetails[trimmedKey] = newValue;
      this.fields.push(this.fb.group({ key: [trimmedKey], value: [newValue, Validators.required] }));
      this.form.reset({ newKey: '', newValue: null });
      this.emitData();
    }
  }

  deleteRow(index: number): void {
    const field = this.fields.at(index).value;
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.mapDetails[field.key];
    this.fields.removeAt(index);
    this.emitData();
  }

  resetSelection(): void {
    this.form.get('newValue')?.setValue(null);
  }

  private emitData(): void {
    this.dataChange.emit({ ...this.mapDetails });
  }
}
