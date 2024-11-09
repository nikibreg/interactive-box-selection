import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoxesStore, boxesStoreInstance } from '../boxes.store';

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
}
