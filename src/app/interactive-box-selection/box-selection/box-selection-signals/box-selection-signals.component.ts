import { Component } from '@angular/core';
import { BoxesStore } from '../../boxes.store';

@Component({
  selector: 'app-box-selection-signals',
  templateUrl: './box-selection-signals.component.html',
  styleUrl: '../box-selection.component.css'
})
export class BoxSelectionSignalsComponent {
  constructor(
    private boxStore: BoxesStore
  ) {}
  shouldUseSignals: boolean | null = null;
  
  boxes: any = [];
  selectBox: (index: number) => void = () => {};
  selectOption: (option: string) => void = () => {};
  selectedBoxIndex: any = null;
  resetSelections: () => void = () => {};

  
  ngOnInit(): void {
    this.boxes = this.boxStore.getBoxes();
    this.selectBox = this.boxStore.selectBox;
    this.selectOption = this.boxStore.selectOption;
    this.selectedBoxIndex = this.boxStore.getSelectedBoxIndex();
    this.resetSelections = this.boxStore.resetSelections;
  }
}
