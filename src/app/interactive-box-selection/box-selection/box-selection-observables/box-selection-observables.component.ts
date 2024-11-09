import { Component } from '@angular/core';
import { FeatureFlagsService } from '../../../feature-flags.service';
import { InteractiveBoxSelectionService } from '../../interactive-box-selection.service';
import { map, Observable } from 'rxjs';
import { Box } from '../../models/box';
import { BoxComponent } from '../../box/box.component';
import { OptionSelectorComponent } from '../../option-selector/option-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-selection-observables',
  templateUrl: './box-selection-observables.component.html',
  styleUrl: '../box-selection.component.css',
  standalone: true,
  imports: [CommonModule, BoxComponent, OptionSelectorComponent]
})
export class BoxSelectionObservablesComponent {
  constructor(
    public boxSelectionService: InteractiveBoxSelectionService,
  ) {}
  boxes$: Observable<Box[]>;
  selectedBoxIndex: number | null;

  get selectedOption$() {
    return this.selectedBoxIndex !== null 
      ? this.boxSelectionService.boxes$.pipe(
          map(boxes => boxes[this.selectedBoxIndex!].selectedOption)
        )
      : null;
  }
  
  ngOnInit(): void {
    this.boxSelectionService.loadSelections();

    this.boxes$ = this.boxSelectionService.boxes$;
    this.selectedBoxIndex = this.boxSelectionService.selectedBoxIndex;
  }

  selectBox(index: number): void {
    this.boxSelectionService.selectBox(index);
    this.selectedBoxIndex = index;
  }

  selectOption(option: string): void {
    this.boxSelectionService.selectOption(option);
    this.selectedBoxIndex = this.boxSelectionService.selectedBoxIndex;
  }

  resetSelections(): void {
    this.boxSelectionService.resetSelections();
    this.selectedBoxIndex = null;
  }
}
