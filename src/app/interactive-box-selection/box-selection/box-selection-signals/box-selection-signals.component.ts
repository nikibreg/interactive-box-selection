import { Component, inject, Signal } from '@angular/core';
import { boxesStoreInstance, BoxesStore } from '../../boxes.store';
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
  ],
  providers: [
    { provide: BoxesStore, useValue: boxesStoreInstance }
  ]
})
export class BoxSelectionSignalsComponent {
  store = inject(BoxesStore);
  constructor(
  ) {}

  ngOnInit(): void {
    this.store.loadSelections();
  }

  resetSelections(): void {
    this.store.resetSelections();
  }

  selectBox(boxIndex: number) {
    this.store.selectBox(boxIndex)
  }
}
