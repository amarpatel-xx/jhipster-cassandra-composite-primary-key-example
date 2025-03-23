import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-dialog-component',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './edit-dialog-component.component.html',
  styleUrls: ['./edit-dialog-component.component.css'],
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { key: string; value: string },
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.value);
  }
}
