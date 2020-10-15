import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename',
})
export class FilenamePipe implements PipeTransform {
  transform(value: string): string {
    const parts = value.split('/');
    return parts[parts.length - 1];
  }
}
