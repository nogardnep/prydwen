import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  askConfirmation(
    callback: (confirmed: boolean) => void,
    message?: string
  ): void {
    const response = confirm(message ? message : 'Are you sure?');

    return callback(response);
  }

  inform(message: string): void {
    alert(message);
  }
}
