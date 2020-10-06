import { ConfigMangager } from './config-manager';
import { config } from '../../config/config';

export class PathManager {
  static getGlobalResourcePath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      '/' +
      config.resourcesPath
    );
  }

  static getLocalResourcePath(projectName: string): string {
    return this.getOneProjectPath(projectName);
  }

  static getProjectsPath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot + '/' + config.projectsPath
    );
  }

  static getOneProjectPath(projectName: string): string {
    return PathManager.getProjectsPath() + '/' + projectName;
  }

  static getOneProjectDataPath(projectName: string): string {
    return (
      PathManager.getOneProjectPath(projectName) +
      '/' +
      config.projectDataFileName
    );
  }

  static getTrackPresetsPath(): string {
    return (
      ConfigMangager.getUserConfiguration().dataRoot +
      '/' +
      config.trackPresetsPath
    );
  }

  static getTrackPresetDataFilePath(presetName: string): string {
    return (
      PathManager.getTrackPresetFolderPath(presetName) +
      '/' +
      config.presetDataFileName
    );
  }

  static getTrackPresetFolderPath(presetName: string): string {
    return PathManager.getTrackPresetsPath() + '/' + presetName;
  }
}
