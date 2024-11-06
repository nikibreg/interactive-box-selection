import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractiveBoxSelectionModule } from './interactive-box-selection/interactive-box-selection.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InteractiveBoxSelectionModule
  ],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}
