import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';
import { EditDialogComponent } from '../edit-dialog-component/edit-dialog-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map-string-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, EditDialogComponent],
  templateUrl: './map-string-component.component.html',
  styleUrls: ['./map-string-component.component.css'],
})
export class MapStringComponent {
  @Input() inputFields: Map<string, string> = new Map<string, string>();
  @Output() dataChange = new EventEmitter<Map<string, string>>();

  mapDetails: Map<string, string> = new Map<string, string>();
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  newKey: string = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  newValue: string = '';

  editingKey: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  editingValue: string = '';

  constructor(private dialog: MatDialog) {
    this.mapDetails = new Map(this.inputFields);
  }

  openEditDialog(key: string, value: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px', // ✅ Set width inline
      height: '300px', // ✅ Set height inline
      maxHeight: '90vh', // ✅ Prevent overflow
      data: { key, value },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.mapDetails.set(key, result);
        this.emitData();
      }
    });
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.inputFields) {
      this.mapDetails = new Map(this.inputFields);
    }
  }

  addNewRow(): void {
    if (this.newKey.trim() !== '') {
      this.mapDetails.set(this.newKey.trim(), this.newValue.trim());
      this.newKey = '';
      this.newValue = '';
      this.emitData();
    }
  }

  deleteRow(key: string): void {
    this.mapDetails.delete(key);
    this.emitData();
  }

  closeDialog(): void {
    this.editingKey = null;
    this.editingValue = '';
  }

  saveChanges(): void {
    if (this.editingKey !== null) {
      this.mapDetails.set(this.editingKey, this.editingValue);
      this.emitData();
    }
    this.closeDialog();
  }

  private emitData(): void {
    this.dataChange.emit(new Map(this.mapDetails));
  }
}
