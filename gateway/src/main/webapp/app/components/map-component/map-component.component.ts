import { Component } from '@angular/core';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponent {
  inputFields: { key: string; value: string }[] = [{ key: '', value: '' }];

  @Output() dataChange = new EventEmitter<{ key: string; value: string }[]>();

  addRow(): void {
    this.inputFields.push({ key: '', value: '' });
    this.emitData();
  }

  emitData(): void {
    this.dataChange.emit(this.inputFields);
  }
}
