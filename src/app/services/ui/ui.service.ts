import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UIService {
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

  askConfirmation(
    callback: (confirmed: boolean) => void,
    message?: string
  ): void {
    const response = confirm(message ? message : 'Are you sure?');

    return callback(response);
  }



  askName(
    callback: (response: string) => void,
    message?: string
  ): void {
    const response = prompt(message ? message : '');

    return callback(response);
  }

  inform(message: string): void {
    alert(message);
  }
}
