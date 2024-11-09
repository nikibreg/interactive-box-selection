import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { boxesStoreInstance, BoxesStore } from '../boxes.store';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
  providers: [{ provide: BoxesStore, useValue: boxesStoreInstance }],
  standalone: true,
})
export class OptionSelectorComponent {
  readonly store = inject(BoxesStore);
  constructor() {
    // this.selectedOption
  }

  
  selectOption(option: string): void {
    this.store.selectOption(option);
  }

  // selectedOption$ = this.boxStore.getSelectedOption();

  // selectOption(option: string): void {
  //   this.optionSelected.emit(option);
  // }

  // selectOption(option: string): void {
  //   this.optionSelected.emit(option);
  // }
}
