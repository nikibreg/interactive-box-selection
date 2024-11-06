import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box/box.component';
import { BoxSelectionComponent } from './box-selection/box-selection-container.component';
import { OptionSelectorComponent } from './option-selector/option-selector.component';
import { BoxSelectionObservablesComponent } from './box-selection/box-selection-observables/box-selection-observables.component';
import { BoxSelectionSignalsComponent } from './box-selection/box-selection-signals/box-selection-signals.component';


@NgModule({
  declarations: [
    BoxComponent,
    BoxSelectionComponent,
    OptionSelectorComponent,
    BoxSelectionObservablesComponent,
    BoxSelectionSignalsComponent
  ],
  imports: [
    CommonModule
  ]

})
export class InteractiveBoxSelectionModule { }
