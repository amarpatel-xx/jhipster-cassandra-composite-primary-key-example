import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditDialogComponent } from '../edit-dialog-component/edit-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-number-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, EditDialogComponent],
  templateUrl: './map-number-component.component.html',
  styleUrls: ['./map-number-component.component.css'],
})
export class MapNumberComponent {
  @Input() inputFields: Map<string, number> = new Map<string, number>();
  @Output() dataChange = new EventEmitter<Map<string, number>>();

  mapDetails: Map<string, number> = new Map<string, number>();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  newKey: string = '';
  newValue: number | null = null; // ✅ Ensure it's a number

  editingKey: string | null = null;
  editingValue: number | null = null; // ✅ Ensure it's a number

  constructor(private dialog: MatDialog) {}

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  openEditDialog(key: string, value: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px', // ✅ Set width inline
      height: '300px', // ✅ Set height inline
      maxHeight: '90vh', // ✅ Prevent overflow
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && !isNaN(result)) {
        // ✅ Ensure result is a valid number
        this.mapDetails.set(key, parseFloat(result)); // ✅ Convert to number
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.newKey.trim() !== '' && this.newValue !== null && !isNaN(this.newValue)) {
      this.mapDetails.set(this.newKey.trim(), this.newValue);
      this.newKey = '';
      this.newValue = null;
      this.emitData();
    }
  }

  deleteRow(key: string): void {
    this.mapDetails.delete(key);
    this.emitData();
  }

  saveChanges(): void {
    if (this.editingKey !== null && this.editingValue !== null && !isNaN(this.editingValue)) {
      this.mapDetails.set(this.editingKey, this.editingValue);
      this.emitData();
    }
    this.closeDialog();
  }

  closeDialog(): void {
    this.editingKey = null;
    this.editingValue = null;
  }

  private emitData(): void {
    this.dataChange.emit(new Map(this.mapDetails));
  }
}
