import { Injectable } from '@angular/core';
import { Box } from './models/box';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface BoxesState {
  boxes: Box[];
  selectedBoxIndex: number | null;
  selectedOption: string | null;
}

const STORAGE_KEY = 'boxes';
const DEFAULT_BOXES = Array(10).fill({ selectedOption: null });
const OPTIONS = ['Option A', 'Option B', 'Option C', 'Option D'];

const initialState: BoxesState = {
  boxes: DEFAULT_BOXES,
  selectedBoxIndex: null,
  selectedOption: null
};

export const BoxesStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    getOptions() {
      return OPTIONS;
    },
    selectBox(index: number) {
      patchState(store, state => ({ ...state, selectedBoxIndex: index }));
      console.log(store.selectedBoxIndex())
    },

    selectOption(option: string) {
      console.log(store.selectedBoxIndex(), store.boxes())
      
      const currentIndex = store.selectedBoxIndex();
      if (currentIndex === null) return;

      const updatedBoxes = [...store.boxes()];
      updatedBoxes[currentIndex] = { selectedOption: option };

      let nextIndex = currentIndex;
      if (currentIndex < updatedBoxes.length - 1) {
        nextIndex = updatedBoxes.findIndex((box, idx) =>
          idx > currentIndex && !box.selectedOption
        );
      }

      patchState(store, state => ({
        boxes: updatedBoxes,
        selectedBoxIndex: nextIndex
      }));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBoxes));
    },

    resetSelections() {
      patchState(store, state => ({
        boxes: DEFAULT_BOXES,
        selectedBoxIndex: null
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOXES));
    },

    loadSelections() {
      const savedBoxes = localStorage.getItem(STORAGE_KEY);
      if (savedBoxes) {
        patchState(store, state => ({ boxes: JSON.parse(savedBoxes) }));
      }
    }
  }))
);

// Singleton instance of BoxesStore
export const boxesStoreInstance = new BoxesStore();
