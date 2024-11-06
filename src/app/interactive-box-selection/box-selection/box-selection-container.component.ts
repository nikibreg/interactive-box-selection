import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from '../../feature-flags.service';
import { InteractiveBoxSelectionService } from '../interactive-box-selection.service';
import { BoxesStore } from '../boxes.store';

@Component({
  selector: 'app-box-selection',
  template: `
  @if (shouldUseSignals) {
    <app-box-selection-signals />
  } @else {
    <app-box-selection-observables />
  }
`,
  changeDetection: ChangeDetectionStrategy.OnPush
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
