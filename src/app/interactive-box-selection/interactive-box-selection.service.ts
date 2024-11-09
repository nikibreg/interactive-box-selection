import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
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

  get selectedOption$() {
    return this.selectedBoxIndex !== null 
      ? this.boxes$.pipe(
          map(boxes => boxes[this.selectedBoxIndex!].selectedOption)
        )
      : null;
  }

  selectBox(index: number): void {
    this.selectedBoxIndex = index;
  }

  selectOption(option: string): void {
    if (this.selectedBoxIndex !== null) {
      this.boxesSubject.pipe(take(1)).subscribe(boxes => {
        console.log(boxes);
        const updatedBoxes = [...boxes];
        updatedBoxes[this.selectedBoxIndex!].selectedOption = option;
        this.boxesSubject.next(updatedBoxes);

        this.saveSelections();

        const nextIndex = updatedBoxes.findIndex((box, idx) =>
          idx > this.selectedBoxIndex! && !box.selectedOption
        );
        this.selectedBoxIndex = nextIndex !== -1 ? nextIndex : this.selectedBoxIndex;
      });
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
    this.boxesSubject.pipe(take(1)).subscribe(boxes => {
      const selections = boxes.map(box => box.selectedOption);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(selections));
    });
  }
}
