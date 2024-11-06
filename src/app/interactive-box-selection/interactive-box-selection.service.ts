import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Box } from './models/box';

@Injectable({
  providedIn: 'root'
})
export class InteractiveBoxSelectionService {
  private readonly STORAGE_KEY = 'boxSelections';
  boxesSubject = new BehaviorSubject<Box[]>(
    Array(10).fill(null).map(() => ({ selectedOption: null }))
  );
  boxes$ = this.boxesSubject.asObservable();
  selectedBoxIndex: number | null = null;
  options: string[] = ['Option A', 'Option B', 'Option C', 'Option D'];

  selectBox(index: number): void {
    this.selectedBoxIndex = index;
  }


  selectOption(option: string): void {
    if (this.selectedBoxIndex !== null) {
      console.log(this.boxesSubject.getValue())
      const boxes = this.boxesSubject.getValue();
      boxes[this.selectedBoxIndex].selectedOption = option;
      this.boxesSubject.next(boxes);

      this.saveSelections();

      const nextIndex = this.boxesSubject.value.findIndex((box, idx) =>
        idx > this.selectedBoxIndex! && !box.selectedOption
      );
      this.selectedBoxIndex = nextIndex !== -1 ? nextIndex : this.selectedBoxIndex;
    }
  }

  resetSelections(): void {
    this.boxesSubject.next(Array(10).fill(null).map(() => ({ selectedOption: null })));
    this.selectedBoxIndex = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  loadSelections(): void {
    const savedSelections = localStorage.getItem(this.STORAGE_KEY);
    if (savedSelections) {
      const selections = JSON.parse(savedSelections);
      this.boxesSubject.next(selections.map((option: string | null) => ({ selectedOption: option })));
    }
  }

  private saveSelections(): void {
    const selections = this.boxesSubject.value.map(box => box.selectedOption);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(selections));
  }
}
