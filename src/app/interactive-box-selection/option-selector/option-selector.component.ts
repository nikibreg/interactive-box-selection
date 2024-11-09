import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class OptionSelectorComponent {
  @Input() selectedOption: string | null = null;
  @Input() options: string[] = ['Option A', 'Option B', 'Option C', 'Option D'];
  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string): void {
    this.optionSelected.emit(option);
  }
}
