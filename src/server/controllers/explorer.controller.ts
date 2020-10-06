import { LogManager, LogType } from './../utils/log-manager';
import { NextFunction, Request, Response } from 'express';
import { ExplorerManager } from '../utils/explorer-manager';
import { PathManager } from '../utils/path-manager';

export class ExplorerController {
  static getAll(req: Request, res: Response, next: NextFunction): void {
    ExplorerManager.getFirstDirectoriesIn(PathManager.getProjectsPath())
      .then((items: string[]) => {
        res.status(200).json(items);
      })
      .catch((error: string) => {
        res.status(400).json(error);
        LogManager.log(LogType.Error, error);
      });
  }
}
