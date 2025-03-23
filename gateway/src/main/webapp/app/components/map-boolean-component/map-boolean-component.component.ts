import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditDialogComponent } from '../edit-dialog-component/edit-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-boolean-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, EditDialogComponent],
  templateUrl: './map-boolean-component.component.html',
  styleUrls: ['./map-boolean-component.component.css'],
})
export class MapBooleanComponent {
  @Input() inputFields: Map<string, boolean> = new Map<string, boolean>();
  @Output() dataChange = new EventEmitter<Map<string, boolean>>();

  mapDetails: Map<string, boolean> = new Map<string, boolean>();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  newKey: string = '';
  newValue: boolean | null = null; // ✅ Ensure it's a boolean

  editingKey: string | null = null;
  editingValue: boolean | null = null; // ✅ Ensure it's a boolean

  constructor(private dialog: MatDialog) {}

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  openEditDialog(key: string, value: boolean): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && typeof result === 'boolean') {
        // ✅ Ensure result is a boolean
        this.mapDetails.set(key, result);
        this.emitData();
      }
    });
  }

  addNewRow(): void {
    if (this.newKey.trim() !== '' && this.newValue !== null) {
      // ✅ Ensure newValue is a boolean
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
    if (this.editingKey !== null && this.editingValue !== null) {
      // ✅ Ensure editingValue is a boolean
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
