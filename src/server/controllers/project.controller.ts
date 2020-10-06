import { Project } from './../../api/entities/Project';
import { config } from './../../config/config';
import { NextFunction, Request, Response } from 'express';
import { ExplorerManager } from '../utils/explorer-manager';
import { LogManager, LogType } from '../utils/log-manager';
import { PathManager } from '../utils/path-manager';
const fs = require('fs-extra');
const glob = require('glob');

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

    // With Promises:
    fs.readJson(path)
      .then((object: Project) => {
        res.status(200).json(object);
      })
      .catch((error: string) => {
        res.status(200).json(null);
      });
  }

  static updateOne(req: Request, res: Response, next: NextFunction): void {
    const path = ProjectController.makePathToData(req.params[0]);
    const project = req.body;

    ProjectController.storeProject(path, project, (error: string) => {
      if (error) {
        res.status(200).json(project);
      } else {
        res.status(400).json(error);
        LogManager.log(LogType.Error, error);
      }
    });
  }

  private static storeProject(
    path: string,
    project: Project,
    callback: (error: string) => void
  ): void {
    console.log(path);
    fs.writeJson(path, project, (err: string) => {
      if (err) {
        return console.error(err);
      }
    });
  }

  private static makePathToData(pathToFolder: string): string {
    return pathToFolder + '/' + config.projectDataFileName;
  }
}
