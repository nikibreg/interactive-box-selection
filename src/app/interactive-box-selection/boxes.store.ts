import { Injectable, signal } from '@angular/core';
import { Box } from './models/box';

@Injectable({
  providedIn: 'root'
})
export class BoxesStore {
  private readonly STORAGE_KEY = 'boxes';
  private readonly DEFAULT_BOXES = Array(10).fill({ selectedOption: null });

  private boxes = signal<Box[]>(this.DEFAULT_BOXES);
  private selectedBoxIndex = signal<number | null>(null);

  getBoxes() {
    return this.boxes.asReadonly();
  }

  getSelectedBoxIndex() {
    return this.selectedBoxIndex.asReadonly(); 
  }

  selectBox(index: number) {
    this.selectedBoxIndex.set(index);
  }

  selectOption(option: string) {
    const currentIndex = this.selectedBoxIndex();
    if (currentIndex === null) return;

    const updatedBoxes = [...this.boxes()];
    updatedBoxes[currentIndex] = { selectedOption: option };
    this.boxes.set(updatedBoxes);
    
    if (this.selectedBoxIndex()! < this.boxes().length - 1) {
      const nextIndex = this.boxes().findIndex((box, idx) =>
        idx > this.selectedBoxIndex()! && !box.selectedOption
      );
      this.selectedBoxIndex.set(nextIndex);
    }
    this.saveToLocalStorage();
  }

  resetSelections() {
    this.boxes.set(this.DEFAULT_BOXES);
    this.selectedBoxIndex.set(null);
    this.saveToLocalStorage();
  }

  loadSelections() {
    const savedBoxes = localStorage.getItem(this.STORAGE_KEY);
    if (savedBoxes) {
      this.boxes.set(JSON.parse(savedBoxes));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.boxes()));
  }
}

