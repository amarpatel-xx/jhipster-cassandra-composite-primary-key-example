import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditNumberDialogComponent } from '../edit-number-dialog-component/edit-number-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-number-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, EditNumberDialogComponent], // ✅ Use ReactiveFormsModule
  templateUrl: './map-number-component.component.html',
  styleUrls: ['./map-number-component.component.css'],
})
export class MapNumberComponent {
  @Input() inputFields: Map<string, number> = new Map<string, number>();
  @Output() dataChange = new EventEmitter<Map<string, number>>();

  mapDetails: Map<string, number> = new Map<string, number>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      newKey: ['', Validators.required], // ✅ Key is required
      newValue: ['', [Validators.pattern(/^-?\d+(\.\d+)?$/)]], // ✅ Number validation
    });
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  openEditNumberDialog(key: string, value: number): void {
    const dialogRef = this.dialog.open(EditNumberDialogComponent, {
      width: '500px',
      height: '300px',
      maxHeight: '90vh',
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && !isNaN(result)) {
        this.mapDetails.set(key, parseFloat(result));
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.form.valid) {
      const { newKey, newValue } = this.form.value;
      this.mapDetails.set(newKey.trim(), parseFloat(newValue));
      this.form.reset(); // ✅ Clears form fields after adding
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
