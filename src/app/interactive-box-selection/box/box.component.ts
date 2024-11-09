import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class BoxComponent {
  @Input() isSelected = false;
  @Input() selectedOption: any;
  @Output() onSelect = new EventEmitter<any>();

  selectBox() {
    this.onSelect.emit()
  }
}
