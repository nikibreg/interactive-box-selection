import { Component, Signal } from '@angular/core';
import { BoxesStore } from '../../boxes.store';
import { Box } from '../../models/box';
import { OptionSelectorComponent } from '../../option-selector/option-selector.component';
import { BoxComponent } from '../../box/box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-selection-signals',
  templateUrl: './box-selection-signals.component.html',
  styleUrl: '../box-selection.component.css',
  standalone: true,
  imports: [
    CommonModule,
    BoxComponent,
    OptionSelectorComponent
  ]
})
export class BoxSelectionSignalsComponent {
  constructor(
    public boxStore: BoxesStore
  ) {}
  boxes: Signal<Box[]>;
  selectedBoxIndex: Signal<number | null>;

  ngOnInit(): void {
    this.boxStore.loadSelections();
    this.boxes = this.boxStore.getBoxes();
    this.selectedBoxIndex = this.boxStore.getSelectedBoxIndex();
  }

  selectBox(index: number): void {
    this.boxStore.selectBox(index);
  }

  selectOption(option: string): void {
    this.boxStore.selectOption(option);
    this.selectedBoxIndex = this.boxStore.getSelectedBoxIndex();
  }

  resetSelections(): void {
    this.boxStore.resetSelections();
  }
}
