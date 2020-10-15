import { Resource, resourceTypes } from './../../models/entities/Resource';
// TODO: delete?

import { NextFunction, Request, Response } from 'express';
import { PathManager } from '../utils/path-manager';
const glob = require('glob');


export class ResourceController {
  static getAllGlobal(req: Request, res: Response, next: NextFunction): void {
    ResourceController.getAll(req, res, next, false);
  }

  static getAllLocal(req: Request, res: Response, next: NextFunction): void {
    const projectName = req.params.projectName;

    ResourceController.getAll(req, res, next, true, projectName);
  }

  static getOneGlobal(req: Request, res: Response, next: NextFunction): void {
    ResourceController.getOne(
      PathManager.getGlobalResourcePath(),
      req,
      res,
      next
    );
  }

  static getOneLocal(req: Request, res: Response, next: NextFunction): void {
    const projectName = req.params.projectName;

    ResourceController.getOne(
      PathManager.getLocalResourcePath(projectName),
      req,
      res,
      next
    );
  }

  private static getAll(
    req: Request,
    res: Response,
    next: NextFunction,
    local: boolean,
    projectName?: string
  ): void {
    const types: string = req.params.types;
    let resourcePath: string;

    if (local && projectName !== undefined) {
      resourcePath = PathManager.getLocalResourcePath(projectName);
    } else {
      resourcePath = PathManager.getGlobalResourcePath();
    }

    glob(
      ResourceController.makePattern(resourcePath, types),
      (err: any, items: string[]) => {
        if (err) {
          console.log('Error', err);
          res.status(400).json(err);
        } else {
          const resources: Resource[] = [];

          items.forEach((item: string) => {
            resources.push({
              path: item.replace(resourcePath + '/', ''),
              local,
            });
          });

          res.status(201).json(resources);
        }
      }
    );
  }

  private static getOne(
    resourcePath: string,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const filepath = resourcePath + '/' + req.params[0];
    res.sendFile(filepath);
  }

  private static makePattern(src: string, typeKeys?: string): string {
    let pattern = src + '/**/';

    if (typeKeys === undefined) {
      pattern += '*.*';
    } else {
      const extensions: string[] = [];

      typeKeys.split('-').forEach((typeKey: string) => {
        resourceTypes[typeKey].forEach((extension: string) => {
          extensions.push(extension);
        });
      });

      if (extensions !== undefined) {
        pattern += '?(';

        extensions.forEach((extension: string, index: number) => {
          pattern += '*.' + extension;

          if (index + 1 < extensions.length) {
            pattern += '|';
          } else {
            pattern += ')';
          }
        });
      } else {
        pattern = '';
      }
    }

    return pattern;
  }
}
