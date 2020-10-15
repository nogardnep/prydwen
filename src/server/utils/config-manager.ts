import { UserConfiguration } from './../../models/utils/userConfig';
import { config } from './../../config/config';
import * as fs from 'fs-extra';


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
