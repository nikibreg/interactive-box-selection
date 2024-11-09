import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoxSelectionSignalsComponent } from './interactive-box-selection/box-selection/box-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    BoxSelectionSignalsComponent
  ],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}
