import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponent {
  addOnDetailsText: Map<string, string> = new Map();

  @Output() dataChange = new EventEmitter<Map<string, string>>();

  addRow(key: string, value: string): void {
    if (key) {
      this.addOnDetailsText.set(key, value);
      this.emitData();
    }
  }

  updateValue(key: string, value: string): void {
    if (this.addOnDetailsText.has(key)) {
      this.addOnDetailsText.set(key, value);
      this.emitData();
    }
  }

  emitData(): void {
    this.dataChange.emit(new Map(this.addOnDetailsText)); // Emit a copy
  }
}
