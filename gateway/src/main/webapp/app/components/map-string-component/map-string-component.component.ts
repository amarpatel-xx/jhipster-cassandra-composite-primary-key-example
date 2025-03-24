import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditStringDialogComponent } from '../edit-string-dialog-component/edit-string-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-string-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditStringDialogComponent], // ✅ Use ReactiveFormsModule
  templateUrl: './map-string-component.component.html',
  styleUrls: ['./map-string-component.component.css'],
})
export class MapStringComponent {
  @Input() inputFields: Map<string, string> = new Map<string, string>();
  @Output() dataChange = new EventEmitter<Map<string, string>>();

  mapDetails: Map<string, string> = new Map<string, string>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required], // ✅ Key is required
      newValue: [''], // ✅ Value is optional
    });
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  openEditStringDialog(key: string, value: string): void {
    const dialogRef = this.dialog.open(EditStringDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.mapDetails.set(key, result);
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails.set(newKey.trim(), newValue.trim());
      this.form.reset(); // ✅ Clear form fields after adding
      this.emitData();
    }
  }

  deleteRow(key: string): void {
    this.mapDetails.delete(key);
    this.emitData();
  }

  private emitData(): void {
    this.dataChange.emit(new Map(this.mapDetails));
  }
}
