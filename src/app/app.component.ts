import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoxSelectionComponent } from './interactive-box-selection/box-selection/box-selection-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    BoxSelectionComponent
  ],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}
