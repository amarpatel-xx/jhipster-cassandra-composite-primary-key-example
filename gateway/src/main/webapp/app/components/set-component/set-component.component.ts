import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-set-component',
  templateUrl: './set-component.component.html',
  styleUrls: ['./set-component.component.scss'],
})
export class SetComponent {
  @Input() inputFields: Set<string> = new Set();
  @Output() inputFieldsChange = new EventEmitter<Set<string>>();

  addInputField(): void {
    this.inputFields.add(''); // Adds an empty string
    this.emitChange();
  }

  removeInputField(value: string): void {
    this.inputFields.delete(value);
    this.emitChange();
  }

  updateField(index: number, newValue: string): void {
    const values = Array.from(this.inputFields);
    values[index] = newValue;
    this.inputFields = new Set(values);
    this.emitChange();
  }

  private emitChange(): void {
    this.inputFieldsChange.emit(new Set(this.inputFields)); // Emit updated Set to parent
  }

  get inputFieldsArray(): string[] {
    return Array.from(this.inputFields); // Convert Set to Array for iteration
  }
}
