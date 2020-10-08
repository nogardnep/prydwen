const glob = require('glob');
const fs = require('fs-extra');

export class ExplorerManager {
  static getFirstDirectoriesIn(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(path + '/*', (error: string, items: string[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(items);
        }
      });
    });
  }

  static checkIfFolderExists(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(path, (error: any) => {
        if (error) {
          if (error.code === 'ENOENT') {
            resolve(false);
          } else {
            reject(error);
          }
        } else {
          resolve(true);
        }
      });
    });
  }

  // test with : http://localhost:8000/api/file/C:/Users/Nicolas/prydwen-data/projects/A

  static getFilesIn(path: string, extensions?: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      glob(
        ExplorerManager.makePattern(path, extensions),
        (error: string, items: string[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(items);
          }
        }
      );
    });
  }

  static makePattern(path: string, extensions?: string[]): string {
    let pattern = path + '/**/';

    if (extensions === undefined) {
      pattern += '*.*';
    } else {
      pattern += '?(';

      extensions.forEach((extension: string, index: number) => {
        pattern += '*.' + extension;

        if (index + 1 < extensions.length) {
          pattern += '|';
        } else {
          pattern += ')';
        }
      });
    }

    return pattern;
  }
}
