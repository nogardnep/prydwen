import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private loading = false;

  loadingSubject = new Subject<boolean>();

  constructor() {}

  setLoading(loading): void {
    this.loading = loading;
    this.emitLoading();
  }

  isLoading(): boolean {
    return this.loading;
  }

  emitLoading(): void {
    this.loadingSubject.next(this.loading);
  }
}
