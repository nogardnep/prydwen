import { NextFunction, Request, Response } from 'express';
import { ExplorerManager } from '../utils/explorer-manager';
import { LogManager, LogType } from '../utils/log-manager';
import { resourceTypes } from './../../api/entities/Resource';

const fs = require('fs-extra');

export class FileController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    const path = req.params[0];
    const typeKeys = req.params['types'];
    const extension = FileController.makeExtensions(typeKeys);

    ExplorerManager.getFilesIn(req.params[0], extension)
      .then((items: string[]) => {
        res.status(200).json(items);
      })
      .catch((error: string) => {
        res.status(400).json(error);
        LogManager.log(LogType.Error, error);
      });
  }

  static getSrc(req: Request, res: Response, next: NextFunction): void {
    const path = req.params[0];
    res.sendFile(path);
  }

  static store(req: Request, res: Response, next: NextFunction): void {
    const path = req.params[0];

    res.status(200).json(path);
  }

  static delete(req: Request, res: Response, next: NextFunction): void {
    const path = req.params[0];

    fs.remove(path)
      .then(() => {
        console.log(path)
        res.status(200).json(true);
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json(error);
      });
  }

  private static makeExtensions(typeKeys: string): string[] {
    const extensions: string[] = [];

    typeKeys.split('-').forEach((typeKey: string) => {
      if (resourceTypes[typeKey] !== undefined) {
        resourceTypes[typeKey].forEach((extension: string) => {
          extensions.push(extension);
        });
      }
    });

    return extensions;
  }
}
