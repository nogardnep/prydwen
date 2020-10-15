import { UserConfiguration } from './../../models/utils/userConfig';
import { Request, Response } from 'express';
import { ConfigMangager } from '../utils/config-manager';
import * as fs from 'fs';

export class ConfigController {
  static get(req: Request, res: Response): void {
    res.status(200).json(ConfigMangager.getUserConfiguration());
  }

  static update(req: Request, res: Response): void {
    const newUserConfiguration: UserConfiguration = req.body;

    ConfigMangager.setUserConfig(newUserConfiguration);

    res.status(200).json(ConfigMangager.getUserConfiguration());
  }
}
