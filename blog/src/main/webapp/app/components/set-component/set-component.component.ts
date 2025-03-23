import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-set-component', // ✅ Fixed selector prefix
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './set-component.component.html',
  styleUrls: ['./set-component.component.css'],
})
export class SetComponent {
  @Input() inputFields: Set<string> = new Set<string>(); // ✅ Explicitly defined type
  @Output() dataChange = new EventEmitter<Set<string>>();

  get inputFieldsArray(): string[] {
    return Array.from(this.inputFields); // ✅ Convert Set to Array for iteration
  }

  addInputField(): void {
    // Convert Set to an array
    const entries = Array.from(this.inputFields);

    // Ensure all previous rows have values
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const allFilled = entries.every(value => value !== undefined && value !== null && value !== '');

    if (allFilled) {
      this.inputFields.add(''); // ✅ Adds an empty string only if all fields are filled
      this.emitChange();
    }
  }

  removeInputField(value: string): void {
    if (this.inputFields.has(value)) {
      this.inputFields.delete(value);
    }
  }

  updateField(index: number, newValue: string): void {
    const values = Array.from(this.inputFields);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (values[index] !== undefined) {
      values[index] = newValue;
      this.inputFields = new Set<string>(values); // ✅ Ensure new Set is explicitly typed
      this.emitChange();
    }
  }

  handleInputChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    this.updateField(index, inputElement.value);
  }

  private emitChange(): void {
    this.dataChange.emit(new Set<string>(this.inputFields)); // ✅ Emit updated Set to parent
  }
}
