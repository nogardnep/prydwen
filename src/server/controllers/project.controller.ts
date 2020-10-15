import { NextFunction, Request, Response } from 'express';
import { ExplorerManager } from '../utils/explorer-manager';
import { LogManager, LogType } from '../utils/log-manager';
import { PathManager } from '../utils/path-manager';
import { Project } from './../../models/entities/Project';
import { config } from './../../config/config';
const fs = require('fs-extra');

export class ProjectController {
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

  static getOne(req: Request, res: Response, next: NextFunction): void {
    const path = ProjectController.makePathToData(req.params[0]);

    fs.readJson(path)
      .then((object: Project) => {
        res.status(200).json(object);
      })
      .catch((error: string) => {
        res.status(200).json(null);
      });
  }
  static update(req: Request, res: Response, next: NextFunction): void {
    const path = ProjectController.makePathToData(req.params[0]);
    const project = req.body;

    fs.writeJson(path, project)
      .then(() => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(400).json(error);
        LogManager.log(LogType.Error, error);
      });
  }

  static create(req: Request, res: Response, next: NextFunction): void {
    const path = ProjectController.makePathToProject(req.body.path);

    ExplorerManager.checkIfFolderExists(path)
      .then((exists: boolean) => {
        if (exists) {
          res.status(400).json({
            exists: true,
            message: 'Folder "' + path + '" aleary exists',
          });
        } else {
          fs.mkdir(path);
          res.status(200).json(path);
        }
      })
      .catch((error: object) => {
        LogManager.log(LogType.Error, error);
        res.status(400).json(error);
      });
  }

  static delete(req: Request, res: Response, next: NextFunction): void {
    const path = ProjectController.makePathToProject(req.params[0]);

    fs.remove(path)
      .then(() => {
        res.status(200).json(true);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }


  private static makePathToProject(pathToFolder: string): string {
    return PathManager.getProjectsPath() + '/' + pathToFolder;
  }

  private static makePathToData(pathToFolder: string): string {
    return (
      ProjectController.makePathToProject(pathToFolder) +
      '/' +
      config.projectDataFileName
    );
  }
}
