import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BoxesStore } from '../boxes.store';

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
}
