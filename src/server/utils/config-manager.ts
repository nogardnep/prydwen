import { config } from './../../config/config';
import * as fs from 'fs';

export type UserConfiguration = {
  dataRoot: string;
};

export class ConfigMangager {
   static userConfiguration: UserConfiguration;

  static getUserConfiguration(): UserConfiguration {
    if (this.userConfiguration === undefined) {
      this.userConfiguration = JSON.parse(
        fs.readFileSync(config.userConfigPath).toString()
      ) as UserConfiguration;
    }

    return this.userConfiguration;
  }

  static setUserConfig(userConfiguation: UserConfiguration): void {
    this.userConfiguration = userConfiguation;

    fs.writeFileSync(
      config.userConfigPath,
      JSON.stringify(userConfiguation, null, 2)
    );
  }
}
