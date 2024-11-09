import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  private readonly STORAGE_KEY = 'useSignals';

  // modify this to use the feature with signals
  private _useSignals: boolean = false;

  get useSignals(): boolean {
    return this._useSignals;
  }

  set useSignals(value: boolean) {
    this._useSignals = value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
  }
}
