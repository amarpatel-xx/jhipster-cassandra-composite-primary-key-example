import { Component } from '@angular/core';

@Component({
  selector: 'app-set-component',
  templateUrl: './set-component.component.html',
  styleUrls: ['./set-component.component.scss'],
})
export class SetComponent {
  inputFields: string[] = ['']; // Start with one input field

  addInputField(): void {
    this.inputFields.push('');
  }
}
