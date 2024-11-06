import { Routes } from '@angular/router';
import { BoxSelectionComponent } from './interactive-box-selection/box-selection/box-selection-container.component';
import { featureFlagGuard } from './feature-flag.guard';

export const routes: Routes = [
    { path: '', component: BoxSelectionComponent, canActivate: [featureFlagGuard] }
];
