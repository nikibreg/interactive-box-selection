import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from '../../feature-flags.service';
import { InteractiveBoxSelectionService } from '../interactive-box-selection.service';
import { BoxesStore } from '../boxes.store';
import { BoxSelectionObservablesComponent } from './box-selection-observables/box-selection-observables.component';
import { BoxSelectionSignalsComponent } from './box-selection-signals/box-selection-signals.component';

@Component({
  selector: 'app-box-selection',
  template: `
  @if (shouldUseSignals) {
    <app-box-selection-signals />
  } @else {
    <app-box-selection-observables />
  }
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BoxSelectionSignalsComponent, BoxSelectionObservablesComponent]
})
export class BoxSelectionComponent implements OnInit {
  constructor(
    private featureFlags: FeatureFlagsService,
  ) { }

  shouldUseSignals: boolean | null = null;
  ngOnInit(): void {
    this.shouldUseSignals = this.featureFlags.useSignals;
  }
}
