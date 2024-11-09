import { Routes } from '@angular/router';
import { featureFlagGuard } from './feature-flag.guard';
import { BoxSelectionObservablesComponent } from './interactive-box-selection/box-selection/box-selection-observables.component';

export const routes: Routes = [
    { path: '', component: BoxSelectionObservablesComponent, canActivate: [featureFlagGuard] }
];
