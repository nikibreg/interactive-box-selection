import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Box } from './models/box';

@Injectable({
  providedIn: 'root'
})
export class InteractiveBoxSelectionService {
  private readonly STORAGE_KEY = 'boxSelections';
  private boxesSubject = new BehaviorSubject<Box[]>(
    Array(10).fill(null).map(() => ({ selectedOption: null }))
  );
  boxes$ = this.boxesSubject.asObservable();
  private selectedBoxIndexSubject = new BehaviorSubject<number | null>(null);
  selectedBoxIndex$ = this.selectedBoxIndexSubject.asObservable();
  options: string[] = ['Option A', 'Option B', 'Option C', 'Option D'];

  get selectedOption$() {
    return this.selectedBoxIndex$.pipe(
      map(selectedIndex => 
        selectedIndex !== null 
          ? this.boxes$.pipe(
              map(boxes => boxes[selectedIndex].selectedOption)
            )
          : null
      )
    );
  }

  selectBox(index: number): void {
    this.selectedBoxIndexSubject.next(index)
  }

  selectOption(option: string): void {
    this.selectedBoxIndex$.pipe(take(1)).subscribe(selectedBoxIndex => {
      if (selectedBoxIndex !== null) {
        this.boxesSubject.pipe(take(1)).subscribe(boxes => {
          console.log(boxes);
          const updatedBoxes = [...boxes];
          updatedBoxes[selectedBoxIndex].selectedOption = option;
          this.boxesSubject.next(updatedBoxes);

          this.saveSelections();

          const nextIndex = updatedBoxes.findIndex((box, idx) =>
            idx > selectedBoxIndex && !box.selectedOption
          );
          this.selectedBoxIndexSubject.next(nextIndex !== -1 ? nextIndex : selectedBoxIndex);
        });
      }
    });
  }

  resetSelections(): void {
    this.boxesSubject.next(Array(10).fill(null).map(() => ({ selectedOption: null })));
    this.selectedBoxIndexSubject.next(null)
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
