import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InteractiveBoxSelectionService } from '../interactive-box-selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class OptionSelectorComponent {

  constructor(public boxSelectionService: InteractiveBoxSelectionService) {
  }

  selectOption(option: string) {
    this.boxSelectionService.selectOption(option);
  }
}
