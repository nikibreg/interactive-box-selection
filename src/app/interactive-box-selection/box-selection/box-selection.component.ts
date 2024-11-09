import { Component } from '@angular/core';
import { InteractiveBoxSelectionService } from '../interactive-box-selection.service';
import { map, Observable } from 'rxjs';
import { Box } from '../models/box';
import { OptionSelectorComponent } from '../option-selector/option-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-selection-observables',
  templateUrl: './box-selection.component.html',
  styleUrl: './box-selection.component.css',
  standalone: true,
  imports: [CommonModule, OptionSelectorComponent]
})
export class BoxSelectionObservablesComponent {
  constructor(
    public boxSelectionService: InteractiveBoxSelectionService,
  ) {}
  boxes$: Observable<Box[]>;
  
  ngOnInit(): void {
    this.boxSelectionService.loadSelections();

    this.boxes$ = this.boxSelectionService.boxes$;
  }

  selectBox(index: number): void {
    this.boxSelectionService.selectBox(index);
  }

  selectOption(option: string): void {
    this.boxSelectionService.selectOption(option);
  }

  resetSelections(): void {
    this.boxSelectionService.resetSelections();
  }
}
